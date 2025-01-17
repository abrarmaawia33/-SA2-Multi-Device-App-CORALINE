import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';


// coraline animation code [HOME PAGE]
if (document.body.id === "home-page") {
const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 13;

const scene = new THREE.Scene();
let bee;
let mixer;
const loader = new GLTFLoader();
loader.load('modern/JavaScript/coraline_jones_wii.glb',
    function (gltf) {
        bee = gltf.scene;
        bee.position.y = -1
        bee.rotation.y = 1.5
        scene.add(bee);

        mixer = new THREE.AnimationMixer(bee);
        mixer.clipAction(gltf.animations[0]).play();
        modelMove();
    },
    function (xhr) {},
    function (error) {}
);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);


const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if(mixer) mixer.update(0.02);
};
reRender3D();

let arrPositionModel = [
    {
        id: 'banner',
        position: {x: 0, y: -1, z: 0},
        rotation: {x: 0, y: 1.5, z: 0}
    },
    {
        id: "description",
        position: { x: 2, y: -1, z: -5 },
        rotation: { x: 0.5, y: -0.5, z: 0 },
    },
    {
        id: "intro",
        position: { x: -1, y: -1, z: -5 },
        rotation: { x: 0, y: 0.5, z: 0 },
    },
    {
        id: "description2",
        position: { x: 0.8, y: -1, z: 0 },
        rotation: { x: 0.3, y: -0.5, z: 0 },
    },
    {
        id: "image",
        position: { x: 0, y: -1, z: 0 },
        rotation: { x: 0, y: 1.5, z: 0},
    },
    {
        id: "video",
        position: { x: -1.7, y: -1, z: 0 },
        rotation: { x: 0, y: 0, z: 0},
    },
];
const modelMove = () => {
    const sections = document.querySelectorAll('.section');
    let currentSection;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSection = section.id;
        }
    });
    let position_active = arrPositionModel.findIndex(
        (val) => val.id == currentSection
    );
    if (position_active >= 0) {
        let new_coordinates = arrPositionModel[position_active];
        gsap.to(bee.position, {
            x: new_coordinates.position.x,
            y: new_coordinates.position.y,
            z: new_coordinates.position.z,
            duration: 3,
            ease: "power1.out"
        });
        gsap.to(bee.rotation, {
            x: new_coordinates.rotation.x,
            y: new_coordinates.rotation.y,
            z: new_coordinates.rotation.z,
            duration: 3,
            ease: "power1.out"
        })
    }
}
window.addEventListener('scroll', () => {
    if (bee) {
        modelMove();
    }
})
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})
}

jQuery(document).ready(function ($) {
    $(".slider-img").on("click", function () {
      $(".slider-img").removeClass("active");
      $(this).addClass("active");
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const scrollElements = document.querySelectorAll('.scroll-animation');

    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100)
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('animate');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('animate');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 80)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Initial check
    handleScrollAnimation();
});






