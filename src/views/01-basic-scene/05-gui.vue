<template>
  <div class="scene" ref="sceneDiv"></div>
  <div class="stats" ref="statsDiv"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import * as THREE from 'three';
import Stats from 'stats.js';
// 导入dat.gui
import * as dat from 'dat.gui';
// import { color } from 'dat.gui';
// 导入动画库
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default defineComponent({
  name: 'Gui',
  setup() {
    const sceneDiv = ref<null | HTMLElement>(null);
    const statsDiv = ref<null | HTMLElement>(null);
    // 1、创建场景
    const scene = new THREE.Scene();

    // 2、创建相机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    // 设置相机位置
    camera.position.set(0, 0, 10);
    // 相机对象指向坐标原点，scene.position的默认是new THREE.Vector3(0,0,0)
    camera.lookAt(scene.position);

    // 添加物体
    // 创建几何体
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    // 创建材质
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    // 根据几何体和材质创建物体
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // 将几何体添加到场景中
    scene.add(cube);

    const gui = new dat.GUI();
    gui
      .add(cube.position, 'x')
      .min(0)
      .max(5)
      .step(0.01)
      .name('移动x轴')
      .onChange((value: number) => {
        console.log('值被修改：', value);
      })
      .onFinishChange((value: number) => {
        console.log('完全停下来:', value);
      });
    //   修改物体的颜色
    const params = {
      color: '#0000ff',
      fn: () => {
        //   让立方体运动起来
        gsap.to(cube.position, {
          x: 5, duration: 2, yoyo: true, repeat: -1,
        });
      },
    };
    gui.addColor(params, 'color').onChange((value: string) => {
      console.log('值被修改：', value);
      cube.material.color.set(value);
    });
    // 设置选项框
    gui.add(cube, 'visible').name('是否显示');

    const folder = gui.addFolder('设置立方体');
    folder.add(cube.material, 'wireframe');
    // 设置按钮点击触发某个事件
    folder.add(params, 'fn').name('立方体运动');

    // 设置光源
    const point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); // 点光源位置
    scene.add(point); // 点光源添加到场景中
    // 环境光
    const ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);

    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer();
    // 设置背景颜色
    renderer.setClearColor(0xb9d3ff, 1.0);
    // 设置渲染的尺寸大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 将webgl渲染的canvas内容添加到body
    // document.body.appendChild(renderer.domElement);

    // 创建轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    console.log('controls', controls);

    // 添加坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // 监控性能
    const stats = new Stats();
    stats.showPanel(1); // 0: fps, 1: ms

    // 使用渲染器，通过相机将场景渲染进来
    const render = () => {
      stats.update();
      renderer.render(scene, camera);
      //   渲染下一帧的时候就会调用render函数
      requestAnimationFrame(render);
    };

    render();

    onMounted(() => {
      (sceneDiv.value as HTMLElement).appendChild(renderer.domElement);
      (statsDiv.value as HTMLElement).appendChild(stats.dom);
    });

    return {
      sceneDiv,
      statsDiv,
    };
  },
});
</script>

<style lang="less" scoped>
.stats {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
