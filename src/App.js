import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CurveExtras } from "three/examples/js/curves/CurveExtras";
class App extends Component {
  componentDidMount() {
    this.init();
  }

  init = () => {
    // === SCENE ===
    this.scene = new THREE.Scene();

    // === CAMERA ===
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.camera.position.set(0, 0, -150);

    // === RENDERER ===
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#263238");
    // === WINDOW SIZE ===
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // === CAMERA CONTROLS ===
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    const cube = new THREE.MeshStandardMaterial();

    this.createMesh("square");
    window.addEventListener("resize", this.resize(), false);

    this.update();
  };

  createMesh = (name, type) => {
    if (this.mesh !== undefined) this.scene.remove(this.mesh);
    let shape = new THREE.Shape();
    let width, height, x, y, radius;
    const pos = new THREE.Vector3();
    let rot = 0;

    const extrudeSettings = {
      depth: 8,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1,
    };

    switch (name) {
      case "square":
        width = 80;
        shape.moveTo(0, 0);
        shape.lineTo(0, width);
        shape.lineTo(width, width);
        shape.lineTo(width, 0);
        pos.x = -40;
        pos.y = -40;
        break;
    }

    let geometry;

    geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
    var texture = new THREE.TextureLoader().load("logo192.png");
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set(1.1, 1.1);
    texture.repeat.set(0.01, 0.01);

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    console.log(material);
    this.mesh = new THREE.Mesh(geometry, material);

    this.mesh.position.copy(pos);
    this.mesh.rotation.z = rot;
    this.scene.add(this.mesh);
  };

  //Update frames
  update = () => {
    console.log(this.mesh.scale.y);

 
    requestAnimationFrame(this.update);
    this.renderer.render(this.scene, this.camera);
  };

  //resize
  resize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  render() {
    return (
      <div className="container">
        <div ref={(ref) => (this.mount = ref)} />
      </div>
    );
  }
}

export default App;
