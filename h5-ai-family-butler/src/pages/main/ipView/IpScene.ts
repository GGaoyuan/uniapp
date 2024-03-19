import { registerGLTFLoader } from '@/components/ipViewComponents/core/loader/gltf-loader';
import registerOrbit from "@/components/ipViewComponents/core/controls/orbit";
// import Vec2 from 'vec2';

import { createQuery, createEntity, createWorld, With} from 'titav';
import { AniType, LevelType, ANILOOPS, ScreenInfo, isGuide } from '@/constants/MainPageConstants';
import { PlayerC, ColorC, SizeC, VelocityC, PositionC, AnimateC, StateC, TouchC } from '@/components/ipViewComponents/sysComponents/IpComponent';
import { animateSystem } from '@/components/ipViewComponents/systems/AnimateSystem';
import { stateSystem } from '@/components/ipViewComponents/systems/StateSystem';
import { messageCenter } from '@/components/ipViewComponents/core/message/MessageCenter';
import { changePlayerAnimateC, getCurrentAnimateFrame } from '@/utils/system/animateSysUtils';
import { changePlayerTouchC } from '@/utils/system/touchSysUtils';
import { changePositionC_with_touchC } from '@/utils/system/baseSysUtils';
import { RaycasterSystem } from '@/components/ipViewComponents/systems/RaycasterSystem';

var _THREE = null;
var _CANVAS = null;
export class IpScene {
  // public _THREE = null;
  // public _CANVAS = null;

  private world;
  private scene;
  private camera;
  private renderer;

  private clock;
  private mixer;

  private actions;
  private activeAction;

  private model;
  private gltfAnimations;
  private face;
  private controls;

  private raycaster;

  private renderAnimFrameId;
  private _nextFrameStartHooks;
  private _onNextFrameStart;

  constructor (nextFrameStartHooks, onNextFrameStart) {
    this._nextFrameStartHooks = nextFrameStartHooks;
    this._onNextFrameStart = onNextFrameStart;
    this.initWorld();
  }

  private initWorld () {
    this.world = createWorld();
    this.world.add(
      createEntity()
      .add(PlayerC.create())
      .add(ColorC.create({ value: 0xffffff }))
      .add(SizeC.create({ value: 1 }))
      .add(VelocityC.create())
      .add(
        AnimateC.create({
            frameId: AniType.IDLE
        })
      )
      .add(
        StateC.create({
            stateId: true,
            levelId: LevelType.NONE
        })
      )
      .add(
        TouchC.create({
          touched: false
        })
      )
      .add(
        PositionC.create({
          value: {x:0, y:0}
        }),
      ),
    );
  }

  public initScene (_c, _t) {

    _CANVAS = _c;
    _THREE = _t;

    registerGLTFLoader(_THREE);

    this.clock = new _THREE.Clock();
    this.raycaster = new _THREE.Raycaster();
    ANILOOPS.LOOP = _THREE.LoopOnce;

    this.scene = new _THREE.Scene();
    // this.scene.background = new _THREE.Color(0x7079ff);
    // this.scene.fog = new _THREE.Fog(0x7079ff, 20, 400);

    this.initCamera();
    this.initLight();
    this.initRenderer();
    this.initControls();
    // this.initPlane();
    this.initGlTFLoader();
    this.enterFrame();
    this.addEvent();
    this.resize();
  }

  private addEvent () {
    messageCenter.listen('rayIntersectedModel', this.rayIntersectedHandler, this);
    messageCenter.listen('playAnimate', this.playAnimate, this);
    messageCenter.listen('touched', this.mainTouchHandler, this);
    messageCenter.listen('touchInfo', this.mainTouchtouchInfoHandler, this);
    messageCenter.listen('changeAction', this.changeActionHandler, this);
    messageCenter.listen('hideGLB', this.hideGLBHandler, this);
    messageCenter.listen('startIdleAniTimer', this.startIdleAniTimer, this);
    messageCenter.listen('showModol', this.showModolHandler, this);
  }

  private removeEvent () {
    messageCenter.unlisten('rayIntersectedModel', this.rayIntersectedHandler, this);
    messageCenter.unlisten('playAnimate', this.playAnimate, this);
    messageCenter.unlisten('touched', this.mainTouchHandler, this);
    messageCenter.unlisten('touchInfo', this.mainTouchtouchInfoHandler, this);
    messageCenter.unlisten('changeAction', this.changeActionHandler, this);
    messageCenter.unlisten('hideGLB', this.hideGLBHandler, this);
    messageCenter.unlisten('startIdleAniTimer', this.startIdleAniTimer, this);
    messageCenter.unlisten('showModol', this.showModolHandler, this);
  }

  private initCamera () {
    this.camera = new _THREE.PerspectiveCamera( 18, _CANVAS.width / _CANVAS.height, 0.1, 2000);
    this.camera.lookAt(new _THREE.Vector3(0, 0, 0));
    this.camera.position.set( 0, -1.2, 12);

    // let _w = ScreenInfo.screenW;
    // let _h = ScreenInfo.screenH;
    // let k = _w / _h;
    // let s = 600;
    // this.camera = new _THREE.OrthographicCamera(
    //   _w/2,
    //   -_w/2,
    //   _h/2,
    //   -_h/2,
    //   0.1,
    //   2000
    // );

    // this.camera.lookAt(new _THREE.Vector3(0, 0, 0));
    // this.camera.position.set( 0, 1.276, 5.090 );

  }

  private initLight () {

    const ambientLight = new _THREE.AmbientLight(0xebebeb, 0.7)
    this.scene.add(ambientLight);
    ambientLight.position.set( 0, 0, 0 );

    const dirLight = new _THREE.DirectionalLight( 0x75b1ff, 0.3 );
    dirLight.position.set( - 3.5, 2.5, 4.2);
    this.scene.add( dirLight );

    const dirLight1 = new _THREE.DirectionalLight( 0xfec2c2, 0.6);
    dirLight1.position.set( 3.6, 1.7, 2.4);
    this.scene.add( dirLight1 );

    const dirLight2 = new _THREE.DirectionalLight( 0xffffff, 0.3 );
    dirLight2.position.set(0, 20, 28);
    this.scene.add( dirLight2 );
    dirLight2.castShadow = true;

    // shadowmap的区域，值越大阴影质量越好
    dirLight2.shadow.mapSize.width = 2048;
    dirLight2.shadow.mapSize.height = 2048;

    // 没有产生阴影的关键设置在这里
    const cam = dirLight2.shadow.camera;
    console.log(cam);
    cam.near = 1;
    cam.far = 50;
    cam.left = -100;
    cam.right = 100;
    cam.top = 100;
    cam.bottom = -100;

    ////光投影相机
    // const cameraHelper = new _THREE.CameraHelper( cam );
    // this.scene.add( cameraHelper );
    // cameraHelper.visible = true;
    // // 光源
    // const helper = new _THREE.DirectionalLightHelper( dirLight2 );
    // this.scene.add( helper );
    // helper.visible = true;
  }

  private particle;
  private initPlane () {
    // const geoPlane = new _THREE.PlaneBufferGeometry(100, 100);
    // const mat3 = new _THREE.MeshPhongMaterial( {
    //   color: 0x5F68F1,
    //   metalness: 0.2,
    //   shininess: 30,
    //   specular: 0x5F68F1
    // });

    // const plane = new _THREE.Mesh(geoPlane, mat3);
    // plane.rotation.x = -Math.PI / 2;
    // plane.position.y = -3;
    // plane.z = 5;
    // plane.castShadow = false;
    // plane.receiveShadow = true;
    // this.scene.add(plane);

    // mat3.transparent = true;
    // mat3.opacity = 0.1;

    // const plane1 = new _THREE.Mesh(
    //   new _THREE.PlaneGeometry(),
    //   new _THREE.ShadowMaterial( {
    //     color: 0xffffff, // 0x7079ff
    //     transparent: true,
    //     opacity: 0.75,
    //     side: _THREE.DoubleSide,
    //   } ),
    // );
    // plane1.rotation.x = -Math.PI / 2;
    // plane1.position.y = -3;
    // plane1.z = 5;
    // // plane1.scale.setScalar( 10 );
    // // plane.castShadow = false;
    // plane1.receiveShadow = true;
    // this.scene.add(plane1);


    // init particle
    this.particle = new _THREE.Object3D();
    this.scene.add(this.particle);
    this.particle.position.z = -600;

    const geometry = new _THREE.TetrahedronGeometry(2, 0);
    const material = new _THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular:0x8d70ff,
      shininess:12,
      shading: _THREE.FlatShading
    });

    for (let i = 0; i < 200; i++) {
      const mesh = new _THREE.Mesh(geometry, material);
      mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      mesh.position.multiplyScalar(45 + (Math.random() * ScreenInfo.screenW));
      mesh.rotation.set(Math.random() * 1, Math.random() * 1, Math.random() * 1);
      this.particle.add(mesh);
    }
  }

  private initGlTFLoader () {
    // model
    var loader = new _THREE.GLTFLoader();
    // aidou7.glb 新春版
    loader.load('https://ivr.migu.cn/ai-family-butler/static/butler/model/aidou6.glb', (gltf) => {

      this.camera.position.set( 0, -1.2, 120);

      this.gltfAnimations = gltf.animations;
      this.model = gltf.scene;
      this.scene.add(this.model);

      this.model.scale.set( 1.1, 1.1, 1.1);

      this.model.position.set(0, -1.8, -2);

      //----------------------模型淡入动画-------------------------
      this.model.traverse (
        (object ) => {
          if ( object && object.isMesh ) {
            object.material.transparent = true;
            object.material.opacity = 0;
          }
        }
      );


      // 如果没有引导，显示模型
      if (!isGuide.isGuide) {
        messageCenter.dispatch('showModol');
      }

    }, undefined, (e) => {
      console.error(e);
    });
  }

  private idleInterval = null;
  private startIdleAniTimer () {
    if (this.idleInterval) {
      clearInterval(this.idleInterval);
      this.idleInterval = null;
    }

    this.idleInterval = setTimeout(() => {
      let name = this.activeAction?._clip?.name || '';
      if (name === AniType.IDLE) {
        let aniName = '';
        switch (Math.round(Math.random() * 2)) {
          case 0:
            aniName = AniType.DANCE
          break;
          case 1:
            aniName = AniType.SLEEP
          break;
          case 2:
            aniName = AniType.HOLIDAY
          break;
        }
        messageCenter.dispatch('playAnimate', aniName);
      }

      this.startIdleAniTimer();
    }, ~~(Math.random() * 2 + 9 ) * 1000);
  }

  private showModolHandler () {
    console.log('showModolHandler ');

    isGuide.isGuide = false;
    if (!this.model) return true;

    console.log('showModolHandler show');

    // var fps = 1000 / 120;
    // var opacityNum: number = 0;
    // var intervalNum: number = Math.ceil(200 / fps);
    // var ratio: number = intervalNum / 100;

    // var positionZ: number = Math.ceil(108 / fps);
    // var alphaInterval = setInterval(() => {
    //   if (opacityNum >= intervalNum) {
    //     alphaInterval && clearInterval(alphaInterval);
    //     alphaInterval = null;
    //     console.log('showModolHandler clearInterval')
    //     return;
    //   } 
    //   opacityNum ++;

    //   let newZ = this.camera.position.z - positionZ;
    //   if (newZ < 12) {
    //     newZ = 12;
    //   }
    //   console.log('showModolHandler newZ', newZ)
    //   this.camera.position.set( 0, -1.2, newZ);
    // }, fps);
   
    this.model.traverse (
      (object ) => {
        if ( object.isMesh ) {
          object.material.transparent = true;
          object.material.opacity = 1;
        }
      }
    );

    console.log('gltf.animations', this.gltfAnimations)
    this.createClipAction(this.model, this.gltfAnimations);
    this.startIdleAniTimer();
    this.resize();
    messageCenter.dispatch('playLoading', false);
    
  }

  private initRenderer () {
    this.renderer = new _THREE.WebGLRenderer({ antialias: true,  alpha: true });
    // FIXME 如果有闪退，就优化掉下面这行代码
    this.renderer.setPixelRatio(uni.getSystemInfoSync().pixelRatio);
    this.renderer.setSize(_CANVAS.width, _CANVAS.height);

    this.renderer.gammaOutput = true;
    this.renderer.gammaFactor = 2.2;

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = _THREE.PCFSoftShadowMap;

    // this.renderer.autoClear = false;
    this.renderer.setClearColor( 0x000000, 0 );
  }

  private initControls () {
    const { OrbitControls } = registerOrbit(_THREE);
    this.controls = new OrbitControls( this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.02;
    this.controls.enableZoom = false;
    this.controls.update();
  }

  private createClipAction(model, animations) {

    let states = [AniType.IDLE];
    this.mixer = new _THREE.AnimationMixer(model);
    this.actions = {};

    let i: number = 0,len = animations.length;
    for ( ; i < len; i++) {
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
    this.activeAction = this.actions[AniType.IDLE];

  }

  private clickIndex: number = 0;
  private clickArr = [AniType.CLICK, AniType.LOVER, AniType.BOOM, AniType.MONEY, AniType.God];
  private rayIntersectedHandler (intersected) {
    if (intersected) {
      // TODO 根据交互策略，被点击后模型随机触发两种动画
      let aniName = this.clickArr[this.clickIndex];
      this.playAnimate(aniName);

      this.clickIndex++;
      if (this.clickIndex >= this.clickArr.length) {
        this.clickIndex = 0;
      }
    }
  }

  private mainTouchHandler (touched) {
    changePlayerTouchC(this.world, touched);
  }

  private changeActionHandler (action) {
    this.activeAction = action;
  }

  /**
   * 小程序中canvas层级在最上面，会导致弹窗盖不住模型,所以弹窗出现的时候隐藏模型
   */
  private hideGLBHandler (hide) {
    console.log('hidehidehidehide', hide);
    this.scene.visible = !hide;
    let i: number = 0, len = this.scene.children.length;
    for ( ;i < len; i++) {
      this.scene.children[i].visible = !hide;
    }
  }

  private mainTouchtouchInfoHandler (info) {
    changePositionC_with_touchC(this.world, info);
  }

  private playAnimate (name) {
    // 更新状态
    changePlayerAnimateC(this.world, name);
  }

  private enterFrame() {
    messageCenter.run();

    var dt = this.clock.getDelta();
    if (this.mixer) {
      this.mixer.update(dt);

      this._nextFrameStartHooks.forEach((fn) => fn());
      this._nextFrameStartHooks.clear();

      const state: any = {
        world: this.world,
        _THREE: _THREE,
        mixer: this.mixer,
        actions: this.actions,
        activeAction: this.activeAction,
        animateState: '',
        onNextFrameStart: this._onNextFrameStart,
        camera: this.camera,
        scene: this.scene,
        model: this.model,
        raycaster: this.raycaster,
        orbit: this.controls
      };

      RaycasterSystem(state);
      stateSystem(state);
      animateSystem(state);

      if (this.particle) {
        this.particle.rotation.x += 0.0020;
        this.particle.rotation.y -= 0.0020;
      }

    }

    this.renderAnimFrameId = _CANVAS.requestAnimationFrame(this.enterFrame.bind(this));
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  public resize () {
    this.camera.aspect = ScreenInfo.screenW / ScreenInfo.screenH;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( ScreenInfo.screenW, ScreenInfo.screenH );
  }

  public destory () {
    // 清理渲染帧动画
			_THREE.global.canvas && this.renderAnimFrameId && _THREE.global.canvas.cancelAnimationFrame(this.renderAnimFrameId);
      // 清理canvas对象
      _THREE.global.unregisterCanvas(_CANVAS);
      // 销毁事件
      this.removeEvent();
  }
}
