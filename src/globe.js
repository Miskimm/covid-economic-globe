import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { getTimePoint } from "./timeline.js";

const config = {
    globeRadius: 1.88,
    landPointCount: 12000,
    landClusterCount: 3200
};

function latLngToVector(lat, lng, radius) {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = (lng + 180) * Math.PI / 180;
    return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
}

function drawPolygonPath(context, rings, width, height) {
    for (const ring of rings) {
        if (!ring.length) {
            continue;
        }
        context.moveTo(((ring[0][0] + 180) / 360) * width, ((90 - ring[0][1]) / 180) * height);
        for (let i = 1; i < ring.length; i += 1) {
            context.lineTo(((ring[i][0] + 180) / 360) * width, ((90 - ring[i][1]) / 180) * height);
        }
        context.closePath();
    }
}

export function createGlobe({ stage, initialTimeIndex, onCountryHover, onCountryClick }) {
    const state = {
        width: window.innerWidth,
        height: window.innerHeight,
        isDragging: false,
        pointerX: 0,
        pointerY: 0,
        lastX: 0,
        lastY: 0,
        pointerDownX: 0,
        pointerDownY: 0,
        yawVelocity: 0.0016,
        pitchVelocity: 0,
        pulse: 0,
        countries: [],
        selectedTimeIndex: initialTimeIndex,
        landClusters: [],
        features: [],
        boundaryEntries: [],
        hoveredBoundary: null,
        lockedIso3: null
    };

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x02050c, 7, 12);

    const camera = new THREE.PerspectiveCamera(36, state.width / state.height, 0.1, 100);
    camera.position.set(0, 0.18, 8.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));
    renderer.setSize(state.width, state.height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    stage.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = 0.32;
    globeGroup.rotation.y = initialTimeIndex === 0 ? 2.25 : -0.58;
    scene.add(globeGroup);

    const starGroup = new THREE.Group();
    const boundaryGroup = new THREE.Group();
    const landClusterGroup = new THREE.Group();
    const dummy = new THREE.Object3D();
    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();

    scene.add(starGroup);
    globeGroup.add(boundaryGroup);
    globeGroup.add(landClusterGroup);

    scene.add(new THREE.AmbientLight(0xbadfff, 0.8));

    const keyLight = new THREE.DirectionalLight(0x88d8ff, 1.9);
    keyLight.position.set(4, 3, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffb37e, 0.55);
    rimLight.position.set(-5, 1, -3);
    scene.add(rimLight);

    const ocean = new THREE.Mesh(
        new THREE.SphereGeometry(config.globeRadius, 72, 72),
        new THREE.MeshPhysicalMaterial({
            color: 0x07192c,
            roughness: 0.5,
            metalness: 0.05,
            clearcoat: 0.65,
            clearcoatRoughness: 0.46,
            emissive: 0x061423,
            emissiveIntensity: 0.72,
            transparent: true,
            opacity: 0.98
        })
    );
    globeGroup.add(ocean);

    const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(config.globeRadius * 1.05, 72, 72),
        new THREE.MeshBasicMaterial({
            color: 0x7cdfff,
            transparent: true,
            opacity: 0.08,
            side: THREE.BackSide
        })
    );
    globeGroup.add(atmosphere);

    const outerShell = new THREE.Mesh(
        new THREE.SphereGeometry(config.globeRadius * 1.12, 48, 48),
        new THREE.MeshBasicMaterial({
            color: 0xbdefff,
            transparent: true,
            opacity: 0.045,
            side: THREE.BackSide
        })
    );
    globeGroup.add(outerShell);

    function makeGlowTexture(inner, outer) {
        const size = 128;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        g.addColorStop(0, inner);
        g.addColorStop(0.32, outer);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, size, size);
        return new THREE.CanvasTexture(canvas);
    }

    const cyanColor = new THREE.Color(0x5be1ff);
    const amberColor = new THREE.Color(0xffcf78);
    const redColor = new THREE.Color(0xff7d93);
    const biomePalette = [
        new THREE.Color(0x2ce6ff),
        new THREE.Color(0x58ff9e),
        new THREE.Color(0xffef6a),
        new THREE.Color(0xff8d6f),
        new THREE.Color(0xff69c8),
        new THREE.Color(0xa27dff)
    ];

    let sphereMesh;
    function createMeshes() {
        const sphereGeometry = new THREE.IcosahedronGeometry(0.028, 1);
        sphereMesh = new THREE.InstancedMesh(
            sphereGeometry,
            new THREE.MeshPhysicalMaterial({
                color: 0x7ef3ff,
                roughness: 0.34,
                metalness: 0.02,
                emissive: 0x14263d,
                emissiveIntensity: 0.72,
                transparent: true,
                opacity: 0.94
            }),
            config.landClusterCount
        );
        sphereMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        landClusterGroup.add(sphereMesh);
    }

    createMeshes();

    function addStars() {
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        for (let i = 0; i < 520; i += 1) {
            const r = 16 + Math.random() * 14;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            positions.push(
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.cos(phi),
                r * Math.sin(phi) * Math.sin(theta)
            );
        }
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        starGroup.add(new THREE.Points(geometry, new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.05,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        })));
    }

    addStars();

    function clearObjectChildren(group) {
        while (group.children.length) {
            const child = group.children[group.children.length - 1];
            group.remove(child);
            if (child.geometry) child.geometry.dispose?.();
            if (child.material) child.material.dispose?.();
        }
    }

    function normalizeName(value) {
        return String(value || "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, " ")
            .trim();
    }

    function buildCountryLookup() {
        const lookup = new Map();
        const aliases = {
            "united states of america": "USA",
            "democratic republic of the congo": "COD",
            "dominican republic": "DOM",
            "czechia": "CZE",
            "bosnia and herzegovina": "BIH",
            "central african republic": "CAF",
            "s korea": "KOR",
            "south korea": "KOR",
            "north macedonia": "MKD",
            "eswatini": "SWZ",
            "myanmar": "MMR",
            "burma": "MMR",
            "taiwan": "CHN",
            "taiwan province of china": "CHN"
        };

        state.countries.forEach((country) => {
            lookup.set(country.iso3, country);
            lookup.set(normalizeName(country.name), country);
        });

        Object.entries(aliases).forEach(([name, iso3]) => {
            const match = state.countries.find((country) => country.iso3 === iso3);
            if (match) {
                lookup.set(name, match);
            }
        });

        return lookup;
    }

    function computeFeatureCenter(feature) {
        let sumLat = 0;
        let sumLng = 0;
        let count = 0;
        const polygons = feature.geometry?.type === "Polygon"
            ? [feature.geometry.coordinates]
            : feature.geometry?.type === "MultiPolygon"
                ? feature.geometry.coordinates
                : [];

        polygons.forEach((polygon) => {
            polygon.forEach((ring) => {
                ring.forEach(([lng, lat]) => {
                    sumLat += lat;
                    sumLng += lng;
                    count += 1;
                });
            });
        });

        return count ? { lat: sumLat / count, lng: sumLng / count } : { lat: 0, lng: 0 };
    }

    function buildBoundaryLines(features) {
        clearObjectChildren(boundaryGroup);
        state.boundaryEntries = [];
        const countryLookup = buildCountryLookup();
        for (const feature of features) {
            if (!feature.geometry) continue;
            const positions = [];
            const polygons = feature.geometry.type === "Polygon"
                ? [feature.geometry.coordinates]
                : feature.geometry.type === "MultiPolygon"
                    ? feature.geometry.coordinates
                    : [];

            for (const polygon of polygons) {
                for (const ring of polygon) {
                    for (let i = 0; i < ring.length - 1; i += 1) {
                        const a = latLngToVector(ring[i][1], ring[i][0], config.globeRadius * 1.006);
                        const b = latLngToVector(ring[i + 1][1], ring[i + 1][0], config.globeRadius * 1.006);
                        positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
                    }
                }
            }
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
            const material = new THREE.LineBasicMaterial({
                color: 0x5caad6,
                transparent: true,
                opacity: 0.34
            });
            const line = new THREE.LineSegments(geometry, material);
            const center = computeFeatureCenter(feature);
            const featureName = feature.properties?.name || "";
            const country = countryLookup.get(normalizeName(featureName)) || null;
            line.userData = {
                featureName,
                center,
                country,
                featureRef: feature
            };
            boundaryGroup.add(line);
            state.boundaryEntries.push({
                line,
                center,
                country
            });
        }
    }

    function pickBiomeColor(cluster, activityFactor, growthFactor) {
        const latMix = Math.max(0, Math.min(1, (cluster.lat + 60) / 140));
        const lngWave = (Math.sin((cluster.lng + 180) * 0.065) + 1) * 0.5;
        const bandMix = latMix * 0.52 + lngWave * 0.48;
        const terrainIndex = Math.floor(bandMix * biomePalette.length) % biomePalette.length;
        const accentIndex = (terrainIndex + 2 + (cluster.colorSeed > 0.58 ? 1 : 0)) % biomePalette.length;
        const baseColor = biomePalette[terrainIndex].clone().lerp(biomePalette[accentIndex], 0.14 + cluster.colorSeed * 0.22);
        const coolBias = Math.max(0, 0.55 - bandMix) * 0.42;
        const warmBias = Math.max(0, bandMix - 0.45) * 0.5;
        const blossomBias = cluster.colorSeed > 0.82 ? 0.18 : 0;

        return baseColor
            .lerp(cyanColor, coolBias)
            .lerp(amberColor, warmBias + growthFactor * 0.24)
            .lerp(redColor, activityFactor * 0.18)
            .lerp(new THREE.Color(0xf7efff), blossomBias)
            .offsetHSL((cluster.colorSeed - 0.5) * 0.12, 0.18, 0.04 + growthFactor * 0.06);
    }

    function buildLandPoints(features) {
        state.landClusters = [];
        clearObjectChildren(landClusterGroup);
        createMeshes();
        buildBoundaryLines(features);

        const mask = document.createElement("canvas");
        mask.width = 1600;
        mask.height = 800;
        const ctx = mask.getContext("2d", { willReadFrequently: true });
        ctx.beginPath();
        for (const feature of features) {
            if (!feature.geometry) continue;
            if (feature.geometry.type === "Polygon") {
                drawPolygonPath(ctx, feature.geometry.coordinates, mask.width, mask.height);
            } else if (feature.geometry.type === "MultiPolygon") {
                for (const polygon of feature.geometry.coordinates) {
                    drawPolygonPath(ctx, polygon, mask.width, mask.height);
                }
            }
        }
        ctx.fillStyle = "#fff";
        ctx.fill("evenodd");

        const pixels = ctx.getImageData(0, 0, mask.width, mask.height).data;
        const clusters = [];
        let attempts = 0;
        const maxAttempts = config.landPointCount * 30;

        while (clusters.length < config.landClusterCount && attempts < maxAttempts) {
            const x = Math.floor(Math.random() * mask.width);
            const y = Math.floor(Math.random() * mask.height);
            const alpha = pixels[(y * mask.width + x) * 4 + 3];
            if (alpha > 0) {
                const lng = (x / mask.width) * 360 - 180;
                const lat = 90 - (y / mask.height) * 180;
                clusters.push({ lat, lng });
            }
            attempts += 1;
        }

        clusters.forEach((cluster, index) => {
            const normal = latLngToVector(cluster.lat, cluster.lng, 1).normalize();
            const position = normal.clone().multiplyScalar(config.globeRadius * (1.01 + Math.random() * 0.035));
            const baseScale = 0.45 + Math.random() * 1.2;
            const colorSeed = Math.random();
            const heightSeed = Math.random();
            dummy.position.copy(position);
            dummy.lookAt(position.clone().add(normal));
            dummy.scale.setScalar(baseScale * (0.86 + heightSeed * 0.42));
            dummy.updateMatrix();
            sphereMesh.setMatrixAt(index, dummy.matrix);
            sphereMesh.setColorAt(index, pickBiomeColor({ ...cluster, colorSeed }, 0, 0));
            state.landClusters.push({
                lat: cluster.lat,
                lng: cluster.lng,
                normal,
                position,
                baseScale,
                ownerIso3: null,
                colorSeed,
                heightSeed
            });
        });

        sphereMesh.count = state.landClusters.length;
        sphereMesh.instanceMatrix.needsUpdate = true;
        if (sphereMesh.instanceColor) {
            sphereMesh.instanceColor.needsUpdate = true;
        }
    }

    function assignLandClustersToCountries(countries) {
        if (!state.landClusters.length || !countries.length) {
            return;
        }
        for (const cluster of state.landClusters) {
            let nearest = null;
            let nearestDist = Infinity;
            for (const country of countries) {
                const dist = Math.hypot(cluster.lat - country.lat, (cluster.lng - country.lng) * Math.cos(cluster.lat * Math.PI / 180));
                if (dist < nearestDist) {
                    nearestDist = dist;
                    nearest = country;
                }
            }
            cluster.ownerIso3 = nearest?.iso3 || null;
        }
    }

    function updateBoundaryHighlight(entry) {
        const nextHoverLine = entry?.line || null;
        const previousHoverLine = state.hoveredBoundary?.line || null;
        if (previousHoverLine === nextHoverLine) {
            return;
        }
        const activeIso3 = state.lockedIso3 || entry?.country?.iso3 || null;
        state.boundaryEntries.forEach((item) => {
            const isActive = activeIso3 ? item.country?.iso3 === activeIso3 : item === entry;
            item.line.material.color.set(isActive ? 0xa9f1ff : 0x5caad6);
            item.line.material.opacity = isActive ? 0.96 : 0.34;
        });

        state.hoveredBoundary = entry || null;
    }

    function getHoveredBoundary() {
        pointerNdc.x = (state.pointerX / state.width) * 2 - 1;
        pointerNdc.y = -(state.pointerY / state.height) * 2 + 1;
        raycaster.setFromCamera(pointerNdc, camera);
        const hits = raycaster.intersectObject(ocean, false);
        if (!hits.length) {
            return null;
        }

        const localPoint = globeGroup.worldToLocal(hits[0].point.clone()).normalize();
        const lat = Math.asin(localPoint.y) * 180 / Math.PI;
        const theta = Math.atan2(localPoint.z, -localPoint.x) * 180 / Math.PI;
        const lng = ((theta - 180 + 540) % 360) - 180;

        let nearest = null;
        let nearestScore = Infinity;
        for (const entry of state.boundaryEntries) {
            if (!entry.country) {
                continue;
            }
            const dist = Math.hypot(lat - entry.center.lat, (lng - entry.center.lng) * Math.cos(lat * Math.PI / 180));
            if (dist < nearestScore) {
                nearestScore = dist;
                nearest = entry;
            }
        }

        return nearestScore < 22 ? nearest : null;
    }

    function updateLandClustersForTime() {
        if (!state.landClusters.length) {
            return;
        }

        const exposureByIso = new Map(state.countries.map((country) => [country.iso3, getTimePoint(country, state.selectedTimeIndex)]));
        const tempColor = new THREE.Color();

        state.landClusters.forEach((cluster, index) => {
            const point = cluster.ownerIso3 ? exposureByIso.get(cluster.ownerIso3) : null;
            const caseFactor = point ? Math.min(1, point.cases / 5000000) : 0;
            const exposureFactor = point ? Math.min(1, point.exposure / 12) : 0;
            const growthFactor = point && point.cases > 0 ? Math.max(0, Math.min(1, (point.recovery + 6) / 18)) : 0;
            const activityFactor = Math.max(caseFactor, exposureFactor * 0.65);
            const scale = cluster.baseScale * (0.82 + cluster.heightSeed * 0.38) * Math.max(0.001, activityFactor * 0.92 + growthFactor * 0.2);

            dummy.position.copy(cluster.position);
            dummy.lookAt(cluster.position.clone().add(cluster.normal));
            dummy.scale.setScalar(scale);
            dummy.updateMatrix();
            sphereMesh.setMatrixAt(index, dummy.matrix);

            tempColor.copy(pickBiomeColor(cluster, activityFactor, growthFactor));
            sphereMesh.setColorAt(index, tempColor);
        });

        sphereMesh.count = state.landClusters.length;
        sphereMesh.instanceMatrix.needsUpdate = true;
        if (sphereMesh.instanceColor) {
            sphereMesh.instanceColor.needsUpdate = true;
        }
    }

    function updateHover() {
        if (state.isDragging) {
            updateBoundaryHighlight(state.lockedIso3 ? state.boundaryEntries.find((entry) => entry.country?.iso3 === state.lockedIso3) || null : null);
            if (!state.lockedIso3) {
                onCountryHover?.(null);
            }
            return;
        }

        if (state.lockedIso3) {
            const lockedEntry = state.boundaryEntries.find((entry) => entry.country?.iso3 === state.lockedIso3) || null;
            updateBoundaryHighlight(lockedEntry);
            return;
        }

        const hovered = getHoveredBoundary();
        if (!hovered?.country) {
            updateBoundaryHighlight(null);
            onCountryHover?.(null);
            return;
        }

        updateBoundaryHighlight(hovered);
        onCountryHover?.(hovered.country, state.pointerX, state.pointerY);
    }

    function animate() {
        requestAnimationFrame(animate);
        state.pulse += 0.016;

        if (!state.isDragging) {
            globeGroup.rotation.y += state.yawVelocity;
            globeGroup.rotation.x += state.pitchVelocity;
            state.yawVelocity *= 0.985;
            state.pitchVelocity *= 0.92;
            state.yawVelocity += 0.00002;
        }

        globeGroup.rotation.x = Math.max(-0.8, Math.min(0.8, globeGroup.rotation.x));

        outerShell.rotation.y += 0.00035;
        atmosphere.rotation.y -= 0.0002;

        updateHover();
        renderer.render(scene, camera);
    }

    renderer.domElement.addEventListener("pointerdown", (event) => {
        state.isDragging = true;
        state.pointerDownX = event.clientX;
        state.pointerDownY = event.clientY;
        state.lastX = event.clientX;
        state.lastY = event.clientY;
        state.pointerX = event.clientX;
        state.pointerY = event.clientY;
        if (!state.lockedIso3) {
            onCountryHover?.(null);
        }
    });

    window.addEventListener("pointermove", (event) => {
        state.pointerX = event.clientX;
        state.pointerY = event.clientY;
        if (!state.isDragging) {
            return;
        }
        const dx = event.clientX - state.lastX;
        const dy = event.clientY - state.lastY;
        globeGroup.rotation.y += dx * 0.0045;
        globeGroup.rotation.x += dy * 0.0034;
        state.yawVelocity = dx * 0.00022;
        state.pitchVelocity = dy * 0.00018;
        state.lastX = event.clientX;
        state.lastY = event.clientY;
    });

    window.addEventListener("pointerup", (event) => {
        state.pointerX = event.clientX;
        state.pointerY = event.clientY;
        const moved = Math.hypot(event.clientX - state.pointerDownX, event.clientY - state.pointerDownY);
        if (moved < 6) {
            const clicked = getHoveredBoundary();
            state.lockedIso3 = clicked?.country?.iso3 || null;
            updateBoundaryHighlight(clicked || null);
            onCountryClick?.(clicked?.country || null, state.pointerX, state.pointerY);
        }
        state.isDragging = false;
    });

    function resize() {
        state.width = window.innerWidth;
        state.height = window.innerHeight;
        camera.aspect = state.width / state.height;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));
        renderer.setSize(state.width, state.height);
    }

    window.addEventListener("resize", resize, { passive: true });

    animate();

    return {
        setFeatures(features) {
            if (features) {
                state.features = features;
                buildLandPoints(features);
                assignLandClustersToCountries(state.countries);
                updateLandClustersForTime();
            }
        },
        setCountries(countries) {
            state.countries = countries;
            state.hoveredBoundary = null;
            if (state.features.length) {
                buildBoundaryLines(state.features);
            }
            assignLandClustersToCountries(countries);
            updateLandClustersForTime();
            const lockedEntry = state.lockedIso3 ? state.boundaryEntries.find((entry) => entry.country?.iso3 === state.lockedIso3) || null : null;
            updateBoundaryHighlight(lockedEntry);
        },
        setTimeIndex(timeIndex) {
            state.selectedTimeIndex = timeIndex;
            updateLandClustersForTime();
        },
        setLockedCountry(iso3) {
            state.lockedIso3 = iso3 || null;
            const lockedEntry = state.lockedIso3 ? state.boundaryEntries.find((entry) => entry.country?.iso3 === state.lockedIso3) || null : null;
            updateBoundaryHighlight(lockedEntry);
        },
        getCanvas() {
            return renderer.domElement;
        }
    };
}
