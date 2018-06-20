import React, { Component } from "react";
import THREELib from "three-js";
import earth from "./assets/earth.png";

const THREE = THREELib(["OrbitControls"]);

let earthCanvas;
let renderer;
let scene;
let camera;
let cameraControl;
let loader, canvas;
let raycaster;
let mouse;
let targetList = [];
let width;
let height;

class Earth extends Component {
  state = {
    lon: "",
    lat: ""
  };

  componentDidMount() {
    this.init();
  }

  init() {
    scene = new THREE.Scene();

    earthCanvas = document.getElementById("earthCanvas");
    var parentEle = document.getElementById("formContainer");
    width = parentEle.clientWidth * 0.9;
    height = width / 2.5;

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(width, height);
    renderer.shadowMap.Enabled = true;

    const earthGeometry = new THREE.SphereGeometry(15, 60, 60);
    const earthMaterial = this.createEarthMaterial();
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthMesh.name = "earth";
    scene.add(earthMesh);

    var overlayGeometry = new THREE.SphereGeometry(15, 60, 60);
    var overlayMaterial = this.createOverlayMaterial();
    var overlayMesh = new THREE.Mesh(overlayGeometry, overlayMaterial);
    overlayMesh.name = "overlay";
    scene.add(overlayMesh);
    targetList.push(overlayMesh);

    camera.position.z = 45;
    camera.lookAt(scene.position);

    cameraControl = new THREE.OrbitControls(camera, earthCanvas);
    cameraControl.enableZoom = false;
    cameraControl.enablePan = false;

    earthCanvas.appendChild(renderer.domElement);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    this.threeRender();

    parentEle.addEventListener("resize", this.handleResize, false);
    earthCanvas.addEventListener("dblclick", this.dblclick, false);
    earthCanvas.style.cursor =
      "url('http://www.rw-designer.com/cursor-extern.php?id=90679'), auto";
  }

  createEarthMaterial() {
    loader = new THREE.TextureLoader();
    var earthTexture = loader.load(earth);

    var earthMaterial = new THREE.MeshBasicMaterial();
    earthMaterial.map = earthTexture;
    earthMaterial.transparent = true;

    return earthMaterial;
  }

  createOverlayMaterial() {
    var olMaterial = new THREE.MeshBasicMaterial();
    olMaterial.map = new THREE.Texture(this.addCanvas());
    olMaterial.transparent = true;
    olMaterial.opacity = 0.6;
    return olMaterial;
  }

  addCanvas() {
    canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    var context = canvas.getContext("2d");
    return canvas;
  }

  lonLatToVector3(lng, lat) {
    const out = new THREE.Vector3();
    out.set(lng / 90 * Math.PI / 2, lat / 90 * Math.PI / 2, 0);
    return out;
  }

  threeRender = () => {
    cameraControl.update();
    renderer.render(scene, camera);
    requestAnimationFrame(this.threeRender);
  };

  handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  dblclick = event => {
    mouse.x = event.offsetX / width * 2 - 1;
    mouse.y = -(event.offsetY / height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(targetList);

    if (intersects.length > 0) {
      const uv = intersects[0].uv;
      const lon = 180 * uv.y - 90;
      const lat = 360 * uv.x - 180;
      this.props.onEarthClick(Number(lon.toFixed(2)), Number(lat.toFixed(2)));
    }
  };

  render() {
    return <div id="earthCanvas" />;
  }
}

export default Earth;
