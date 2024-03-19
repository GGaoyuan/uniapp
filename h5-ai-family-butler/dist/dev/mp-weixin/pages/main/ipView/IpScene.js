"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const common_vendor = require("../../../common/vendor.js");
const components_ipViewComponents_core_loader_gltfLoader = require("../../../components/ipViewComponents/core/loader/gltf-loader.js");
const components_ipViewComponents_core_controls_orbit = require("../../../components/ipViewComponents/core/controls/orbit.js");
const constants_MainPageConstants = require("../../../constants/MainPageConstants.js");
const components_ipViewComponents_sysComponents_IpComponent = require("../../../components/ipViewComponents/sysComponents/IpComponent.js");
const components_ipViewComponents_systems_AnimateSystem = require("../../../components/ipViewComponents/systems/AnimateSystem.js");
const components_ipViewComponents_systems_StateSystem = require("../../../components/ipViewComponents/systems/StateSystem.js");
const components_ipViewComponents_core_message_MessageCenter = require("../../../components/ipViewComponents/core/message/MessageCenter.js");
const utils_system_animateSysUtils = require("../../../utils/system/animateSysUtils.js");
const utils_system_touchSysUtils = require("../../../utils/system/touchSysUtils.js");
const utils_system_baseSysUtils = require("../../../utils/system/baseSysUtils.js");
const components_ipViewComponents_systems_RaycasterSystem = require("../../../components/ipViewComponents/systems/RaycasterSystem.js");
var _THREE = null;
var _CANVAS = null;
class IpScene {
  constructor(nextFrameStartHooks, onNextFrameStart) {
    // public _THREE = null;
    // public _CANVAS = null;
    __publicField(this, "world");
    __publicField(this, "scene");
    __publicField(this, "camera");
    __publicField(this, "renderer");
    __publicField(this, "clock");
    __publicField(this, "mixer");
    __publicField(this, "actions");
    __publicField(this, "activeAction");
    __publicField(this, "model");
    __publicField(this, "gltfAnimations");
    __publicField(this, "face");
    __publicField(this, "controls");
    __publicField(this, "raycaster");
    __publicField(this, "renderAnimFrameId");
    __publicField(this, "_nextFrameStartHooks");
    __publicField(this, "_onNextFrameStart");
    __publicField(this, "particle");
    __publicField(this, "idleInterval", null);
    __publicField(this, "clickIndex", 0);
    __publicField(this, "clickArr", [constants_MainPageConstants.AniType.CLICK, constants_MainPageConstants.AniType.LOVER, constants_MainPageConstants.AniType.BOOM, constants_MainPageConstants.AniType.MONEY, constants_MainPageConstants.AniType.God]);
    this._nextFrameStartHooks = nextFrameStartHooks;
    this._onNextFrameStart = onNextFrameStart;
    this.initWorld();
  }
  initWorld() {
    this.world = common_vendor.createWorld();
    this.world.add(
      common_vendor.createEntity().add(components_ipViewComponents_sysComponents_IpComponent.PlayerC.create()).add(components_ipViewComponents_sysComponents_IpComponent.ColorC.create({ value: 16777215 })).add(components_ipViewComponents_sysComponents_IpComponent.SizeC.create({ value: 1 })).add(components_ipViewComponents_sysComponents_IpComponent.VelocityC.create()).add(
        components_ipViewComponents_sysComponents_IpComponent.AnimateC.create({
          frameId: constants_MainPageConstants.AniType.IDLE
        })
      ).add(
        components_ipViewComponents_sysComponents_IpComponent.StateC.create({
          stateId: true,
          levelId: constants_MainPageConstants.LevelType.NONE
        })
      ).add(
        components_ipViewComponents_sysComponents_IpComponent.TouchC.create({
          touched: false
        })
      ).add(
        components_ipViewComponents_sysComponents_IpComponent.PositionC.create({
          value: { x: 0, y: 0 }
        })
      )
    );
  }
  initScene(_c, _t) {
    _CANVAS = _c;
    _THREE = _t;
    components_ipViewComponents_core_loader_gltfLoader.registerGLTFLoader(_THREE);
    this.clock = new _THREE.Clock();
    this.raycaster = new _THREE.Raycaster();
    _THREE.LoopOnce;
    this.scene = new _THREE.Scene();
    this.initCamera();
    this.initLight();
    this.initRenderer();
    this.initControls();
    this.initGlTFLoader();
    this.enterFrame();
    this.addEvent();
    this.resize();
  }
  addEvent() {
    components_ipViewComponents_core_message_MessageCenter.messageCenter.listen("rayIntersectedModel", this.rayIntersectedHandler, this);
    components_ipViewComponents_core_message_MessageCenter.messageCenter.listen("playAnimate", this.playAnimate, this);
    components_ipViewComponents_core_message_MessageCenter.messageCenter.listen("touched", this.mainTouchHandler, this);
    components_ipViewComponents_core_message_MessageCenter.messageCenter.listen("touchInfo", this.mainTouchtouchInfoHandler, this);
    components_ipViewComponents_core_message_MessageCenter.messageCenter.listen("changeAction", this.changeActionHandler, this);
    components_ipViewComponents_core_message_MessageCenter.messageCenter.listen("hideGLB", this.hideGLBHandler, this);
    components_ipViewComponents_core_message_MessageCenter.messageCenter.listen("startIdleAniTimer", this.startIdleAniTimer, this);
    components_ipViewComponents_core_message_MessageCenter.messageCenter.listen("showModol", this.showModolHandler, this);
  }
  removeEvent() {
    components_ipViewComponents_core_message_MessageCenter.messageCenter.unlisten("rayIntersectedModel", this.rayIntersectedHandler, this);
    components_ipViewComponents_core_message_MessageCenter.messageCenter.unlisten("playAnimate", this.playAnimate, this);
    components_ipViewComponents_core_message_MessageCenter.messageCenter.unlisten("touched", this.mainTouchHandler, this);
    components_ipViewComponents_core_message_MessageCenter.messageCenter.unlisten("touchInfo", this.mainTouchtouchInfoHandler, this);
    components_ipViewComponents_core_message_MessageCenter.messageCenter.unlisten("changeAction", this.changeActionHandler, this);
    components_ipViewComponents_core_message_MessageCenter.messageCenter.unlisten("hideGLB", this.hideGLBHandler, this);
    components_ipViewComponents_core_message_MessageCenter.messageCenter.unlisten("startIdleAniTimer", this.startIdleAniTimer, this);
    components_ipViewComponents_core_message_MessageCenter.messageCenter.unlisten("showModol", this.showModolHandler, this);
  }
  initCamera() {
    this.camera = new _THREE.PerspectiveCamera(18, _CANVAS.width / _CANVAS.height, 0.1, 2e3);
    this.camera.lookAt(new _THREE.Vector3(0, 0, 0));
    this.camera.position.set(0, -1.2, 12);
  }
  initLight() {
    const ambientLight = new _THREE.AmbientLight(15461355, 0.7);
    this.scene.add(ambientLight);
    ambientLight.position.set(0, 0, 0);
    const dirLight = new _THREE.DirectionalLight(7713279, 0.3);
    dirLight.position.set(-3.5, 2.5, 4.2);
    this.scene.add(dirLight);
    const dirLight1 = new _THREE.DirectionalLight(16696002, 0.6);
    dirLight1.position.set(3.6, 1.7, 2.4);
    this.scene.add(dirLight1);
    const dirLight2 = new _THREE.DirectionalLight(16777215, 0.3);
    dirLight2.position.set(0, 20, 28);
    this.scene.add(dirLight2);
    dirLight2.castShadow = true;
    dirLight2.shadow.mapSize.width = 2048;
    dirLight2.shadow.mapSize.height = 2048;
    const cam = dirLight2.shadow.camera;
    console.log(cam);
    cam.near = 1;
    cam.far = 50;
    cam.left = -100;
    cam.right = 100;
    cam.top = 100;
    cam.bottom = -100;
  }
  initPlane() {
    this.particle = new _THREE.Object3D();
    this.scene.add(this.particle);
    this.particle.position.z = -600;
    const geometry = new _THREE.TetrahedronGeometry(2, 0);
    const material = new _THREE.MeshPhongMaterial({
      color: 16777215,
      specular: 9269503,
      shininess: 12,
      shading: _THREE.FlatShading
    });
    for (let i = 0; i < 200; i++) {
      const mesh = new _THREE.Mesh(geometry, material);
      mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      mesh.position.multiplyScalar(45 + Math.random() * constants_MainPageConstants.ScreenInfo.screenW);
      mesh.rotation.set(Math.random() * 1, Math.random() * 1, Math.random() * 1);
      this.particle.add(mesh);
    }
  }
  initGlTFLoader() {
    var loader = new _THREE.GLTFLoader();
    loader.load("https://ivr.migu.cn/ai-family-butler/static/butler/model/aidou6.glb", (gltf) => {
      this.camera.position.set(0, -1.2, 120);
      this.gltfAnimations = gltf.animations;
      this.model = gltf.scene;
      this.scene.add(this.model);
      this.model.scale.set(1.1, 1.1, 1.1);
      this.model.position.set(0, -1.8, -2);
      this.model.traverse(
        (object) => {
          if (object && object.isMesh) {
            object.material.transparent = true;
            object.material.opacity = 0;
          }
        }
      );
      if (!constants_MainPageConstants.isGuide.isGuide) {
        components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("showModol");
      }
    }, void 0, (e) => {
      console.error(e);
    });
  }
  startIdleAniTimer() {
    if (this.idleInterval) {
      clearInterval(this.idleInterval);
      this.idleInterval = null;
    }
    this.idleInterval = setTimeout(() => {
      var _a, _b;
      let name = ((_b = (_a = this.activeAction) == null ? void 0 : _a._clip) == null ? void 0 : _b.name) || "";
      if (name === constants_MainPageConstants.AniType.IDLE) {
        let aniName = "";
        switch (Math.round(Math.random() * 2)) {
          case 0:
            aniName = constants_MainPageConstants.AniType.DANCE;
            break;
          case 1:
            aniName = constants_MainPageConstants.AniType.SLEEP;
            break;
          case 2:
            aniName = constants_MainPageConstants.AniType.HOLIDAY;
            break;
        }
        components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("playAnimate", aniName);
      }
      this.startIdleAniTimer();
    }, ~~(Math.random() * 2 + 9) * 1e3);
  }
  showModolHandler() {
    console.log("showModolHandler ");
    constants_MainPageConstants.isGuide.isGuide = false;
    if (!this.model)
      return true;
    console.log("showModolHandler show");
    this.model.traverse(
      (object) => {
        if (object.isMesh) {
          object.material.transparent = true;
          object.material.opacity = 1;
        }
      }
    );
    console.log("gltf.animations", this.gltfAnimations);
    this.createClipAction(this.model, this.gltfAnimations);
    this.startIdleAniTimer();
    this.resize();
    components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("playLoading", false);
  }
  initRenderer() {
    this.renderer = new _THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(common_vendor.index.getSystemInfoSync().pixelRatio);
    this.renderer.setSize(_CANVAS.width, _CANVAS.height);
    this.renderer.gammaOutput = true;
    this.renderer.gammaFactor = 2.2;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = _THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0, 0);
  }
  initControls() {
    const { OrbitControls } = components_ipViewComponents_core_controls_orbit.registerOrbit(_THREE);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.02;
    this.controls.enableZoom = false;
    this.controls.update();
  }
  createClipAction(model, animations) {
    let states = [constants_MainPageConstants.AniType.IDLE];
    this.mixer = new _THREE.AnimationMixer(model);
    this.actions = {};
    let i = 0, len = animations.length;
    for (; i < len; i++) {
      let clip = animations[i];
      let action = this.mixer.clipAction(clip);
      this.actions[clip.name] = action;
      if (states.indexOf(clip.name) === -1) {
        action.clampWhenFinished = true;
        action.loop = _THREE.LoopOnce;
        action._loop = false;
      } else {
        action._loop = true;
      }
    }
    this.activeAction = this.actions[constants_MainPageConstants.AniType.IDLE];
  }
  rayIntersectedHandler(intersected) {
    if (intersected) {
      let aniName = this.clickArr[this.clickIndex];
      this.playAnimate(aniName);
      this.clickIndex++;
      if (this.clickIndex >= this.clickArr.length) {
        this.clickIndex = 0;
      }
    }
  }
  mainTouchHandler(touched) {
    utils_system_touchSysUtils.changePlayerTouchC(this.world, touched);
  }
  changeActionHandler(action) {
    this.activeAction = action;
  }
  /**
   * 小程序中canvas层级在最上面，会导致弹窗盖不住模型,所以弹窗出现的时候隐藏模型
   */
  hideGLBHandler(hide) {
    console.log("hidehidehidehide", hide);
    this.scene.visible = !hide;
    let i = 0, len = this.scene.children.length;
    for (; i < len; i++) {
      this.scene.children[i].visible = !hide;
    }
  }
  mainTouchtouchInfoHandler(info) {
    utils_system_baseSysUtils.changePositionC_with_touchC(this.world, info);
  }
  playAnimate(name) {
    utils_system_animateSysUtils.changePlayerAnimateC(this.world, name);
  }
  enterFrame() {
    components_ipViewComponents_core_message_MessageCenter.messageCenter.run();
    var dt = this.clock.getDelta();
    if (this.mixer) {
      this.mixer.update(dt);
      this._nextFrameStartHooks.forEach((fn) => fn());
      this._nextFrameStartHooks.clear();
      const state = {
        world: this.world,
        _THREE,
        mixer: this.mixer,
        actions: this.actions,
        activeAction: this.activeAction,
        animateState: "",
        onNextFrameStart: this._onNextFrameStart,
        camera: this.camera,
        scene: this.scene,
        model: this.model,
        raycaster: this.raycaster,
        orbit: this.controls
      };
      components_ipViewComponents_systems_RaycasterSystem.RaycasterSystem(state);
      components_ipViewComponents_systems_StateSystem.stateSystem(state);
      components_ipViewComponents_systems_AnimateSystem.animateSystem(state);
      if (this.particle) {
        this.particle.rotation.x += 2e-3;
        this.particle.rotation.y -= 2e-3;
      }
    }
    this.renderAnimFrameId = _CANVAS.requestAnimationFrame(this.enterFrame.bind(this));
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
  resize() {
    this.camera.aspect = constants_MainPageConstants.ScreenInfo.screenW / constants_MainPageConstants.ScreenInfo.screenH;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(constants_MainPageConstants.ScreenInfo.screenW, constants_MainPageConstants.ScreenInfo.screenH);
  }
  destory() {
    _THREE.global.canvas && this.renderAnimFrameId && _THREE.global.canvas.cancelAnimationFrame(this.renderAnimFrameId);
    _THREE.global.unregisterCanvas(_CANVAS);
    this.removeEvent();
  }
}
exports.IpScene = IpScene;
