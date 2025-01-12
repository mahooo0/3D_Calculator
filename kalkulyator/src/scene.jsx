import useSpline from '@splinetool/r3f-spline';
import * as THREE from 'three';

import {
    OrbitControls,
    OrthographicCamera,
    PerspectiveCamera,
    Text,
} from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Scene({ ...props }) {
    const { nodes, materials } = useSpline(
        'https://prod.spline.design/Do6WIdvJFqSU2Rwe/scene.splinecode'
    );
    console.log('nodes:0', nodes);
    console.log('materials', materials['Cube 2 Material']);
    // Reference to the group
    const cameraref = useRef(); // Reference to the group
    useEffect(() => {
        // const rotationAnimation = gsap.to(groupRef.current.rotation, {
        //     z: '+=' + Math.PI * 2, // Rotate full circle (2 PI radians)
        //     duration: 10, // Duration for one full rotation
        //     repeat: -1, // Infinite loop
        //     ease: 'none', // No easing for constant speed
        //     yoyo: false, // No reverse movement
        // });
        // return () => {
        //     rotationAnimation.kill(); // Cleanup the animation on component unmount
        // };
    }, []);
    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            uColor: { value: new THREE.Color('#000000') }, // Base black color for the stone
            uTime: { value: 0.0 }, // Time for any animation (optional)
        },
        vertexShader: `
            varying vec3 vNormal;
            varying vec3 vPosition;
            
            void main() {
                vNormal = normalize(normalMatrix * normal); // Calculate the normal in view space
                vPosition = position; // Pass the vertex position to fragment shader
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 uColor;
            uniform float uTime;
            varying vec3 vNormal;
            varying vec3 vPosition;
            
            // Function for simulating sharp surface highlights
            float sharpSurface(vec3 normal, vec3 lightDir) {
                float diff = max(dot(normal, lightDir), 0.0);
                return pow(diff, 16.0); // Use a high exponent for sharp reflections (like glossy stone)
            }
    
            void main() {
                vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0)); // Simulated light direction
    
                // Simulate sharp specular highlights
                float highlight = sharpSurface(vNormal, lightDir);
    
                // Color calculation: base black with sharp highlights
                vec3 color = uColor + vec3(highlight * 0.2); // Brighten the highlight areas
                
                // Combine with a slight noise or shimmer effect to add realism (optional)
                float shimmer = sin(vPosition.x * 10.0 + uTime) * 0.05;
                color += vec3(shimmer, shimmer * 0.3, shimmer * 0.1);
    
                gl_FragColor = vec4(color, 1.0); // Final color with sharp highlights
            }
        `,
        // Optionally enable wireframe and smooth shading
        wireframe: false,
        flatShading: false,
    });

    return (
        <>
            <group
                position={props.position}
                rotation={props.rotation}
                scale={props.scale}
                // {...props}
                dispose={null}
                ref={props.groupRef}
            >
                <group rotation={props.groupRotation}>
                    <scene name="Scene 1">
                        <group name="kalkulyator">
                            <mesh
                                castShadow
                                receiveShadow
                                position={[73.64, 150.22, -2691.01]}
                                rotation={[0, 0, 0]}
                            >
                                <Text
                                    fontSize={500}
                                    color="black"
                                    position={[0, 0, 0]}
                                    rotation={[-1.6, 0, 0]}
                                >
                                    Hello, World!
                                </Text>
                            </mesh>
                            <mesh
                                name="Text"
                                geometry={nodes.Text.geometry}
                                material={materials['Text Material']}
                                castShadow
                                receiveShadow
                                position={[-740.65, -600.1, 1695.16]}
                                rotation={[39.26, 0, -1]}
                                scale={[1, 1, 2.66]}
                            />
                            <mesh
                                name="developer.png"
                                geometry={nodes['developer.png'].geometry}
                                material={materials['developer.png Material']}
                                castShadow
                                receiveShadow
                                position={[1500, -583.76, -2210.12]}
                                rotation={[1.57, 0, -2.91]}
                                scale={1}
                            />
                            <mesh
                                name="Cube 2"
                                geometry={nodes['Cube 2'].geometry}
                                material={shaderMaterial}
                                castShadow
                                receiveShadow
                                position={[101.98, -356.39, 67.89]}
                                rotation={[Math.PI / 2, 0, 0]}
                            />
                            <group
                                name="Group"
                                position={[75, -3.61, -2705.63]}
                                scale={[1.03, 0.89, 1.18]}
                            >
                                <mesh
                                    name="Rectangle"
                                    geometry={nodes.Rectangle.geometry}
                                    material={materials['Rectangle Material']}
                                    castShadow
                                    receiveShadow
                                    position={[-26.87, 166.96, -41.46]}
                                    rotation={[-Math.PI / 2, 0, 0]}
                                />
                                <mesh
                                    name="Cube 21"
                                    geometry={nodes['Cube 21'].geometry}
                                    material={materials['Cube 21 Material']}
                                    castShadow
                                    receiveShadow
                                    position={[0, 1.44, 0]}
                                    rotation={[-Math.PI / 2, 0, 0]}
                                />
                            </group>
                            <group
                                name="line5"
                                position={[-1561.24, 372.19, 2887.02]}
                            >
                                <group
                                    name="key 0"
                                    position={[529.82, -28.67, 0]}
                                    scale={[2.06, 0.94, 1]}
                                >
                                    <mesh
                                        name="key "
                                        geometry={nodes['key '].geometry}
                                        material={materials.KEY}
                                        castShadow
                                        receiveShadow
                                    >
                                        <mesh
                                            name="Text 22"
                                            geometry={nodes['Text 22'].geometry}
                                            material={materials.text}
                                            castShadow
                                            receiveShadow
                                            position={[-28.64, 216, -34.95]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                        />
                                    </mesh>
                                </group>
                                <group name="key," position={[2200.54, 0, 0]}>
                                    <mesh
                                        name="key 12"
                                        geometry={nodes['key 12'].geometry}
                                        material={materials.KEY}
                                        castShadow
                                        receiveShadow
                                    >
                                        <mesh
                                            name="Text 23"
                                            geometry={nodes['Text 23'].geometry}
                                            material={materials.text}
                                            castShadow
                                            receiveShadow
                                            position={[-2.55, 216, 14.25]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                        />
                                    </mesh>
                                </group>
                                <group name="key=" position={[3300.81, 0, 0]}>
                                    <mesh
                                        name="key 13"
                                        geometry={nodes['key 13'].geometry}
                                        material={materials['KEY 3']}
                                        castShadow
                                        receiveShadow
                                    >
                                        <mesh
                                            name="Text 24"
                                            geometry={nodes['Text 24'].geometry}
                                            material={materials.text}
                                            castShadow
                                            receiveShadow
                                            position={[33.63, 216, -102.75]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                        />
                                    </mesh>
                                </group>
                            </group>
                            <group
                                name="line4"
                                position={[-1561.24, 372.19, 1834.01]}
                            >
                                <group name="key1">
                                    <mesh
                                        name="key 14"
                                        geometry={nodes['key 14'].geometry}
                                        material={materials.KEY}
                                        castShadow
                                        receiveShadow
                                    >
                                        <mesh
                                            name="Text 25"
                                            geometry={nodes['Text 25'].geometry}
                                            material={materials.text}
                                            castShadow
                                            receiveShadow
                                            position={[33.63, 216, -102.75]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                        />
                                    </mesh>
                                </group>
                                <group name="key2" position={[1100.27, 0, 0]}>
                                    <mesh
                                        name="key 15"
                                        geometry={nodes['key 15'].geometry}
                                        material={materials.KEY}
                                        castShadow
                                        receiveShadow
                                    >
                                        <mesh
                                            name="Text 26"
                                            geometry={nodes['Text 26'].geometry}
                                            material={materials.text}
                                            castShadow
                                            receiveShadow
                                            position={[33.63, 216, -102.75]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                        />
                                    </mesh>
                                </group>
                                <group name="key3" position={[2200.54, 0, 0]}>
                                    <mesh
                                        name="key 16"
                                        geometry={nodes['key 16'].geometry}
                                        material={materials.KEY}
                                        castShadow
                                        receiveShadow
                                    >
                                        <mesh
                                            name="Text 27"
                                            geometry={nodes['Text 27'].geometry}
                                            material={materials.text}
                                            castShadow
                                            receiveShadow
                                            position={[33.63, 216, -102.75]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                        />
                                    </mesh>
                                </group>
                                <group name="key+" position={[3300.81, 0, 0]}>
                                    <mesh
                                        name="key 17"
                                        geometry={nodes['key 17'].geometry}
                                        material={materials['KEY 3']}
                                        castShadow
                                        receiveShadow
                                    >
                                        <mesh
                                            name="Text 28"
                                            geometry={nodes['Text 28'].geometry}
                                            material={materials.text}
                                            castShadow
                                            receiveShadow
                                            position={[33.63, 216, -102.75]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                        />
                                    </mesh>
                                </group>
                            </group>
                            <group
                                name="line 3"
                                position={[-1561.24, 372.19, 769.24]}
                            >
                                <group name="key4">
                                    <mesh
                                        name="key 18"
                                        geometry={nodes['key 18'].geometry}
                                        material={materials.KEY}
                                        castShadow
                                        receiveShadow
                                    >
                                        <mesh
                                            name="Text 29"
                                            geometry={nodes['Text 29'].geometry}
                                            material={materials.text}
                                            castShadow
                                            receiveShadow
                                            position={[33.63, 216, -102.75]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                        />
                                    </mesh>
                                </group>
                                <group name="key5" position={[1100.27, 0, 0]}>
                                    <mesh
                                        name="key 19"
                                        geometry={nodes['key 19'].geometry}
                                        material={materials.KEY}
                                        castShadow
                                        receiveShadow
                                    >
                                        <mesh
                                            name="Text 210"
                                            geometry={
                                                nodes['Text 210'].geometry
                                            }
                                            material={materials.text}
                                            castShadow
                                            receiveShadow
                                            position={[33.63, 216, -102.75]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                        />
                                    </mesh>
                                </group>
                                <group name="key6" position={[2200.54, 0, 0]}>
                                    <mesh
                                        name="key 110"
                                        geometry={nodes['key 110'].geometry}
                                        material={materials.KEY}
                                        castShadow
                                        receiveShadow
                                    >
                                        <mesh
                                            name="Text 211"
                                            geometry={
                                                nodes['Text 211'].geometry
                                            }
                                            material={materials.text}
                                            castShadow
                                            receiveShadow
                                            position={[33.63, 216, -102.75]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                        />
                                    </mesh>
                                </group>
                                <group name="key-" position={[3300.81, 0, 0]}>
                                    <mesh
                                        name="key 111"
                                        geometry={nodes['key 111'].geometry}
                                        material={materials['KEY 3']}
                                        castShadow
                                        receiveShadow
                                    >
                                        <mesh
                                            name="Text 212"
                                            geometry={
                                                nodes['Text 212'].geometry
                                            }
                                            material={materials.text}
                                            castShadow
                                            receiveShadow
                                            position={[33.63, 216, -102.75]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                        />
                                    </mesh>
                                </group>
                            </group>
                            <group
                                name="line2"
                                position={[-1561.28, 372.19, -306.66]}
                            >
                                <group name="key7">
                                    <mesh
                                        name="key 112"
                                        geometry={nodes['key 112'].geometry}
                                        material={materials.KEY}
                                        castShadow
                                        receiveShadow
                                    >
                                        <mesh
                                            name="Text 213"
                                            geometry={
                                                nodes['Text 213'].geometry
                                            }
                                            material={materials.text}
                                            castShadow
                                            receiveShadow
                                            position={[33.63, 216, -102.75]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                        />
                                    </mesh>
                                </group>
                                <group name="key8" position={[1100.27, 0, 0]}>
                                    <mesh
                                        name="key 113"
                                        geometry={nodes['key 113'].geometry}
                                        material={materials.KEY}
                                        castShadow
                                        receiveShadow
                                    >
                                        <mesh
                                            name="Text 214"
                                            geometry={
                                                nodes['Text 214'].geometry
                                            }
                                            material={materials.text}
                                            castShadow
                                            receiveShadow
                                            position={[33.63, 216, -102.75]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                        />
                                    </mesh>
                                </group>
                                <group name="key9" position={[2200.54, 0, 0]}>
                                    <mesh
                                        name="key 114"
                                        geometry={nodes['key 114'].geometry}
                                        material={materials.KEY}
                                        castShadow
                                        receiveShadow
                                    >
                                        <mesh
                                            name="Text 215"
                                            geometry={
                                                nodes['Text 215'].geometry
                                            }
                                            material={materials.text}
                                            castShadow
                                            receiveShadow
                                            position={[33.63, 216, -102.75]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                        />
                                    </mesh>
                                </group>
                                <group name="key *" position={[3300.81, 0, 0]}>
                                    <mesh
                                        name="key 115"
                                        geometry={nodes['key 115'].geometry}
                                        material={materials['KEY 3']}
                                        castShadow
                                        receiveShadow
                                    >
                                        <mesh
                                            name="Text 216"
                                            geometry={
                                                nodes['Text 216'].geometry
                                            }
                                            material={materials.text}
                                            castShadow
                                            receiveShadow
                                            position={[33.63, 216, -102.75]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                        />
                                    </mesh>
                                </group>
                            </group>
                            <group
                                name="line 1 "
                                position={[-1561.24, 372.19, -1395.62]}
                            >
                                <group name="key c">
                                    <mesh
                                        name="key 116"
                                        geometry={nodes['key 116'].geometry}
                                        material={materials['KEY 2']}
                                        castShadow
                                        receiveShadow
                                    >
                                        <mesh
                                            name="Text 217"
                                            geometry={
                                                nodes['Text 217'].geometry
                                            }
                                            material={materials.text}
                                            castShadow
                                            receiveShadow
                                            position={[33.63, 216, -102.75]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                        />
                                    </mesh>
                                </group>
                                <group
                                    name="key +/-"
                                    position={[1100.27, 0, 0]}
                                >
                                    <mesh
                                        name="key 117"
                                        geometry={nodes['key 117'].geometry}
                                        material={materials['KEY 2']}
                                        castShadow
                                        receiveShadow
                                    >
                                        <mesh
                                            name="Text 218"
                                            geometry={
                                                nodes['Text 218'].geometry
                                            }
                                            material={materials.text}
                                            castShadow
                                            receiveShadow
                                            position={[25.23, 216, 35.87]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                        />
                                    </mesh>
                                </group>
                                <group name="key %" position={[2200.54, 0, 0]}>
                                    <mesh
                                        name="key 118"
                                        geometry={nodes['key 118'].geometry}
                                        material={materials['KEY 2']}
                                        castShadow
                                        receiveShadow
                                    >
                                        <mesh
                                            name="Text 219"
                                            geometry={
                                                nodes['Text 219'].geometry
                                            }
                                            material={materials.text}
                                            castShadow
                                            receiveShadow
                                            position={[33.63, 216, -102.75]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                        />
                                    </mesh>
                                </group>
                                <group name="key /" position={[3300.81, 0, 0]}>
                                    <mesh
                                        name="key 119"
                                        geometry={nodes['key 119'].geometry}
                                        material={materials['KEY 3']}
                                        castShadow
                                        receiveShadow
                                    >
                                        <mesh
                                            name="Text 220"
                                            geometry={
                                                nodes['Text 220'].geometry
                                            }
                                            material={materials.text}
                                            castShadow
                                            receiveShadow
                                            position={[33.63, 216, -102.75]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                        />
                                    </mesh>
                                </group>
                            </group>
                            <mesh
                                name="Cube"
                                geometry={nodes.Cube.geometry}
                                material={materials.text}
                                castShadow
                                receiveShadow
                                position={[92.71, -144.39, 40.79]}
                            />
                        </group>
                        <directionalLight
                            name="Directional Light"
                            castShadow
                            intensity={0.2}
                            shadow-mapSize-width={1024}
                            shadow-mapSize-height={1024}
                            shadow-camera-near={-10000}
                            shadow-camera-far={100000}
                            shadow-camera-left={-1000}
                            shadow-camera-right={1000}
                            shadow-camera-top={1000}
                            shadow-camera-bottom={-1000}
                            position={[1008.47, 4622.49, 918.72]}
                        />

                        <hemisphereLight
                            name="Default Ambient Light"
                            intensity={0.75}
                            color="#eaeaea"
                        />
                    </scene>
                </group>
                <mesh name="Box" castShadow receiveShadow rotation={[0, 0, 0]}>
                    <boxGeometry args={[6000, 6000, 6000]} />{' '}
                    {/* Box dimensions */}
                    <meshStandardMaterial
                        color="blue"
                        opacity={0}
                        transparent={true}
                    />
                </mesh>
            </group>

            <PerspectiveCamera
                ref={cameraref}
                makeDefault
                position={[
                    props.cameraPosition?.[0] || 0.00024086734087467972,
                    props.cameraPosition?.[1] || -18624.578274469648,
                    props.cameraPosition?.[2] || 0.018623020673567133,
                ]}
                fov={props.cameraFov || 45}
                near={props.cameraNear || 100}
                far={props.cameraFar || 100000}
                zoom={props.cameraZoom || 1}
            />
            <OrbitControls
                onChange={() => {
                    console.log(cameraref.current.position);
                }}
                enableZoom={
                    props.enableZoom !== undefined ? props.enableZoom : true
                }
                enableRotate={
                    props.enableRotate !== undefined ? props.enableRotate : true
                }
                enablePan={
                    props.enablePan !== undefined ? props.enablePan : true
                }
            />
        </>
    );
}
