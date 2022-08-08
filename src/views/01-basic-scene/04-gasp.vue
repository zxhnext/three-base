<template>
  <div class="scene" ref="sceneDiv"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

export default defineComponent({
  name: 'Gasp',
  setup() {
    const sceneDiv = ref<null | HTMLElement>(null);
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

    // 使用渲染器，通过相机将场景渲染进来
    const render = () => {
      renderer.render(scene, camera);
      //   渲染下一帧的时候就会调用render函数
      requestAnimationFrame(render);
    };

    render();

    // 创建轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    console.log('controls', controls);

    // 添加坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    const animate1 = gsap.to(cube.position, {
      x: 5,
      duration: 5,
      ease: 'power1.inOut',
      //   设置重复的次数，无限次循环-1
      repeat: -1,
      //   往返运动
      yoyo: true,
      //   delay，延迟2秒运动
      delay: 2,
      onComplete: () => {
        console.log('动画完成');
      },
      onStart: () => {
        console.log('动画开始');
      },
    });
    gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: 'power1.inOut' });

    onMounted(() => {
      (sceneDiv.value as HTMLElement).appendChild(renderer.domElement);
    });

    window.addEventListener('dblclick', () => {
      //   console.log(animate1);
      if (animate1.isActive()) {
        //   暂停
        animate1.pause();
      } else {
        //   恢复
        animate1.resume();
      }
    });

    return {
      sceneDiv,
    };
  },
});
</script>

<style lang="less" scoped>

</style>
