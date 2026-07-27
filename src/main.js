import {
    BoxGeometry, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer, Mesh, DirectionalLight,
    MeshPhongMaterial, SphereGeometry, PointLight, Object3D, AxesHelper, GridHelper, Fog, Color, ShaderMaterial,
    RawShaderMaterial
} from "three";
import {OrbitControls} from "three/addons";
import './style.css'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from "./shaders/fragment.glsl";

function main(){

        const canvas = document.querySelector("canvas");
        const renderer = new WebGLRenderer({antialias: true, canvas: canvas});
        const fov = 75;
        const aspect = 2; // the canvas default
        const near = 0.1;
        const far = 5;
        const camera = new PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 2;

        const controls = new OrbitControls(camera, canvas);
        controls.target.set(0, 0, 0);
        controls.update();

        const scene = new Scene();


        {
            const near = 1;
            const far = 2;
            const color = 'lightblue';
            scene.fog = new Fog(color, near, far);
            scene.background = new Color(color);

        }

        // {
        //     const color = 0xFFFFFF;
        //     const intensity = 3;
        //     const light = new DirectionalLight(color, intensity);
        //     light.position.set(-1, 2, 4);
        //     scene.add(light);
        // }
        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;
        const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);

        const material = new RawShaderMaterial({
            uniforms: {
                uColor: {value: '0x44aa88'},
                uTime: {value: 2},
            },
            vertexShader: vertexShader,
            fragmentShader:fragmentShader,
        })

        const cube = new Mesh(geometry, material);
        scene.add(cube);

        function resizeRendererToDisplaySize(renderer) {
            const canvas = renderer.domElement;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            const needResize = canvas.width !== width || canvas.height !== height;
            if (needResize) {
                renderer.setSize(width, height, false);
            }
            return needResize;
        }

        function render() {
            if (resizeRendererToDisplaySize(renderer)) {
                const canvas = renderer.domElement;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }

        requestAnimationFrame(render);
}
main();