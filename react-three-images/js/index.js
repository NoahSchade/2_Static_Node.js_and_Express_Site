function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}setTimeout(() => {
  ReactDOM.render(
  React.createElement("div", null,
  React.createElement(LoadingWrapper, {
    imageSources: [
    {
      src: image1 },
    {
      src: image2 },
    {
      src: image3 }
   ],


    onLoad: (images) =>
    React.createElement("div", null,
    React.createElement(DissolvingGallery, _extends({
      handleResize: false,
      delay: 4,
      getSize: () => ({
        width: 1100, // window.innerWidth,
        height: 1100 // window.innerHeight
      }) },
    { images }))) })),





  document.getElementById('js-app'));
}, 0);

class LoadingWrapper extends React.Component {










  constructor(props) {
    super(props);_defineProperty(this, "state", { loading: true, images: [] });
    this.loader = new THREE.ImageLoader();
    this.loader.crossOrigin = 'Anonymous';
  }

  async componentDidMount() {
    const images = await this.loadAllImages(this.props.imageSources);
    this.setState({ loading: false, images });
  }

  async loadAllImages(images) {
    return await Promise.all(images.map(async image => {
      return await this.loadImage(image.src);
    }));
  }

  loadImage(uri) {
    return new Promise(resolve => {
      this.loader.load(uri, image => resolve(image));
    });
  }

  render() {
    if (this.state.loading) {
      return (
        React.createElement("h1", null, 'Loading...'));

    }
    return this.props.onLoad(this.state.images);
  }}_defineProperty(LoadingWrapper, "propTypes", { onLoad: React.PropTypes.func.isRequired, imageSources: React.PropTypes.array.isRequired });


class DissolvingGallery extends React.Component {







  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return false;
  }

  async componentDidMount() {
    const camera = this.createCamera(80, 0, 0, 60, this.props.getSize);
    const scene = new THREE.Scene();
    this.createLights(scene);
    const width = 100;
    const height = 60;
    this.slide0 = new Slide(width, height, 'out');
    scene.add(this.slide0);
    this.slide1 = new Slide(width, height, 'in');
    scene.add(this.slide1);
    let index = 0;
    const timeline = new TimelineMax({
      repeat: -1,
      repeatDelay: this.props.delay,
      yoyo: true,
      onRepeat: () => index = this.loadNextImages(this.props.images, index) });

    timeline.add(this.slide0.transition(), 0);
    timeline.add(this.slide1.transition(), 0);
    index = this.loadNextImages(this.props.images, index);
    const renderer = this.createRenderer(0x666666);
    const handleWindowResize = this.onWindowResize(camera, renderer, this.props.getSize);
    handleWindowResize();
    if (this.props.handleResize) {
      window.addEventListener('resize', handleWindowResize, false);
    }
    this.animate(renderer, scene, camera);
  }

  loadNextImages(images, index) {
    let first = index;
    let second;
    const tmp = (first + 1) % images.length;
    if (index % 2 === 0) {
      second = tmp;
    } else {
      second = first;
      first = tmp;
    }
    this.slide0.setImage(images[first]);
    this.slide1.setImage(images[second]);
    return tmp;
  }

  onWindowResize(camera, renderer, getSizeCallback) {
    return event => {
      const {
        width,
        height } =
      getSizeCallback();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
  }

  animate(renderer, scene, camera) {
    requestAnimationFrame(() => {
      this.animate(renderer, scene, camera);
    });
    renderer.render(scene, camera);
  }

  createCamera(fov, x = 0, y = 0, z = 0, getSizeCallback) {
    const {
      width,
      height } =
    getSizeCallback();
    const camera = new THREE.PerspectiveCamera(fov, width / height, 1, 1000);
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;
    return camera;
  }

  createLights(scene) {
    const light = new THREE.DirectionalLight();
    light.position.set(0, 0, 1);
    scene.add(light);
  }

  createRenderer(clearColor = 0x000000) {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: this.canvas });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.autoClear = false;
    renderer.setClearColor(clearColor, 0);
    return renderer;
  }

  render() {
    return (
      React.createElement("div", null,
      React.createElement("canvas", {
        width: "480",
        height: "320",
        ref: c => this.canvas = c })));



  }}_defineProperty(DissolvingGallery, "propTypes", { handleResize: React.PropTypes.bool.isRequired, images: React.PropTypes.array.isRequired, delay: React.PropTypes.number.isRequired, getSize: React.PropTypes.func.isRequired });


class Slide extends THREE.Mesh {
  static assignDuration(animationPhase, width, height, geometry) {
    const aDelayDuration = geometry.createAttribute('aDelayDuration', 2);
    const minDuration = 0.8;
    const maxDuration = 1.2;
    const maxDelayX = 0.9;
    const maxDelayY = 0.125;
    const stretch = 0.11;
    let centroid;
    let offset = 0;
    for (let i = 0; i < geometry.faceCount; i++) {
      centroid = geometry.centroids[i];
      const duration = THREE.Math.randFloat(minDuration, maxDuration);
      const delayX = THREE.Math.mapLinear(centroid.x, -width / 2, width / 2, 0, maxDelayX);
      let delayY;
      if (animationPhase === 'in') {
        delayY = THREE.Math.mapLinear(Math.abs(centroid.y), 0, height / 2, 0, maxDelayY);
      } else {
        delayY = THREE.Math.mapLinear(Math.abs(centroid.y), 0, height / 2, maxDelayY, 0);
      }
      for (let j = 0; j < 3; j++) {
        aDelayDuration.array[offset] = delayX + delayY + Math.random() * stretch * duration;
        aDelayDuration.array[offset + 1] = duration;
        offset += 2;
      }
    }
    return maxDuration + maxDelayX + maxDelayY + stretch;
  }

  static assignStartEndPositions(geometry) {
    return [
    geometry.createAttribute('aStartPosition', 3, (data, i) => {
      geometry.centroids[i].toArray(data);
    }),
    geometry.createAttribute('aEndPosition', 3, (data, i) => {
      geometry.centroids[i].toArray(data);
    })];

  }

  static assignControlPoints(geometry, animationPhase) {
    const aControl0 = geometry.createAttribute('aControl0', 3);
    const aControl1 = geometry.createAttribute('aControl1', 3);
    const control0 = new THREE.Vector3();
    const control1 = new THREE.Vector3();
    const data = [];
    let offset = 0;
    let centroid;
    for (let i = 0; i < geometry.faceCount; i++) {
      centroid = geometry.centroids[i];
      const signY = Math.sign(centroid.y);
      control0.x = THREE.Math.randFloat(0.1, 0.3) * 50;
      control0.y = signY * THREE.Math.randFloat(0.1, 0.3) * 70;
      control0.z = THREE.Math.randFloatSpread(20);
      control1.x = THREE.Math.randFloat(0.3, 0.6) * 50;
      control1.y = -signY * THREE.Math.randFloat(0.3, 0.6) * 70;
      control1.z = THREE.Math.randFloatSpread(20);
      if (animationPhase === 'in') {
        control0.subVectors(centroid, control0);
        control1.subVectors(centroid, control1);
      } else {
        control0.addVectors(centroid, control0);
        control1.addVectors(centroid, control1);
      }
      geometry.setFaceData(aControl0, i, control0.toArray(data));
      geometry.setFaceData(aControl1, i, control1.toArray(data));
    }
    return [
    aControl0,
    aControl1];

  }

  static createMaterial(animationPhase, texture) {
    return new THREE.BAS.BasicAnimationMaterial({
      shading: THREE.FlatShading,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 } },

      uniformValues: {
        map: texture },

      vertexFunctions: [
      THREE.BAS.ShaderChunk['cubic_bezier'],
      THREE.BAS.ShaderChunk['ease_cubic_in_out'],
      THREE.BAS.ShaderChunk['quaternion_rotation']],

      vertexParameters: [
      'uniform float uTime;',
      'attribute vec2 aDelayDuration;',
      'attribute vec3 aStartPosition;',
      'attribute vec3 aControl0;',
      'attribute vec3 aControl1;',
      'attribute vec3 aEndPosition;'],

      vertexInit: [
      'float tProgress = clamp(uTime - aDelayDuration.x, 0.0, aDelayDuration.y) / aDelayDuration.y;'],

      vertexPosition: [
      animationPhase === 'in' ? 'transformed *= tProgress;' : 'transformed *= 1.0 - tProgress;',
      'transformed += cubicBezier(aStartPosition, aControl0, aControl1, aEndPosition, tProgress);'] });


  }

  constructor(width, height, animationPhase) {
    const plane = new THREE.PlaneGeometry(width, height, width * 2, height * 2);
    THREE.BAS.Utils.separateFaces(plane);
    const geometry = new THREE.BAS.ModelBufferGeometry(plane, {
      localizeFaces: true,
      computeCentroids: true });

    geometry.bufferUVs();
    const maxDuration = Slide.assignDuration(animationPhase, width, height, geometry);
    Slide.assignStartEndPositions(geometry);
    Slide.assignControlPoints(geometry, animationPhase);
    const texture = new THREE.Texture();
    texture.minFilter = THREE.NearestFilter;
    const material = Slide.createMaterial(animationPhase, texture);
    super(geometry, material);
    this.totalDuration = maxDuration;
    this.frustumCulled = false;
  }

  get time() {
    return this.material.uniforms['uTime'].value;
  }

  set time(newTime) {
    this.material.uniforms['uTime'].value = newTime;
  }

  setImage(image) {
    this.material.uniforms.map.value.image = image;
    this.material.uniforms.map.value.needsUpdate = true;
  }

  transition() {
    return TweenMax.fromTo(this, 3, {
      time: 0 },
    {
      time: this.totalDuration,
      ease: Power0.easeInOut });

  }}