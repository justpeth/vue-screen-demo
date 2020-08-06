<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
:root {
  --datav-panel-color: #1d2127;
  --datav-panel-item-bg: #1b1f25;
  --datav-panel-title-bg: #2e343c;
  --datav-font-color: #bcc9d4;
  --datav-border-color: rgba(255, 255, 255, 0.15);
  --datav-main-color: #2681ff;
  --datav-sub-main-color: #2681ff;
  --datav-red-color: #f15532;
  --datav-error-color: #ff4433;
  --datav-warn-color: #f27a24;
  --datav-gray-color: #90a0ae;
  --datav-dark-color: #262c33;
  --datav-main-hover-color: #409fff;
  --datav-main-click-color: #2681ff;
  --datav-slider-color: #74f0ff;
  --datav-cp-bg-color: #13161a;
  --datav-cp-border-color: #292929;
  --datav-ft-border: 1px solid #3a4659;
  --datav-cp-border: 1px solid #141210;
  --datav-btn-bg-default: #303640;
  --datav-header-bg-color: #1d1e1f;
  --datav-config-bg: ;
  --datav-gui-bg: #191c21;
  --datav-panel-border-color: #282f3a;
  --datav-item-hover-color: rgba(143, 225, 255, 0.1);
  --datav-ruler-bg: #0e1013;
  --datav-ruler-tag-bg: rgba(64, 116, 180, 1);
  --datav-ruler-line-bg: rgba(0, 173, 255, 0.84);
  --datav-ruler-mark-color: #3a4659;
  --datav-ruler-font-color: #90a0ae;
  --datav-scroll-track-bg: #1c222b;
  --datav-com-focus-color: #2483ff;
  --datav-com-hover-color: #409fff;
  --datav-com-focus-bg: rgba(36, 131, 255, 0.02);
  --datav-editor-readonly-color: #1f2329;
  --datav-main-bg: url(https://img.alicdn.com/tfs/TB184VLcPfguuRjSspkXXXchpXa-14-14.png)
    repeat;
  --datav-context-menu-bg: #27343e;
  --datav-context-menu-line: #3a4659;
  --datav-context-menu-hover: #1d262e;
}
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-family: PingFangSC, "Microsoft YaHei", "Helvetica Neue", Arial,
    sans-serif !important;
  font-size: 12px;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  min-width: 1024px;
}
#app {
  overflow: hidden;
  height: 100%;
}
::-webkit-scrollbar {
  display: block;
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-thumb {
  background: #434b55;
  border: 1px solid #434b55;
}
::-webkit-scrollbar-thumb {
  background-color: #434b55;
}
::-webkit-scrollbar-track {
  background: var(--datav-scroll-track-bg);
}

.component-wp {
  width: 100%;
  height: 100%;
  .component-img {
    width: 100%;
    height: 100%;
  }
}
</style>
