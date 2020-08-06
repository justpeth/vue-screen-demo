<template>
  <div class="screen-edit">
    <div class="screen-header">
      <h3>大屏demo</h3>
    </div>
    <div class="screen-edit-main">
      <div class="layer-panel-wp">
        <h3 class="panel-title">已加入页面的图层</h3>
        <draggable
          class="layer-manager-wrap"
          :list="layerComponents"
        >
          <div
            :title="c.name"
            :class="['layer-manager-com','layer-manager-item','layer-manager-thumbail-wrap', {selected: c.id === selectedComponentId}] "
            v-for="c in layerComponents"
            :key="c.id"
            @click="selectedComponent(c.id)"
          >
            <img class="layer-item-thumbail" :src="c.img" :alt="c.name" />
            <div class="layer-manager-thumbail">
              <span class="layer-item-span">{{c.name}}</span>
            </div>
            <div class="layer-thumbail-item"></div>
          </div>
        </draggable>
      </div>
      <div class="layer-panel-wp">
        <h3 class="panel-title">组件库</h3>
        <draggable
          class="layer-manager-wrap"
          :list="viewComponents"
          :group="{ name: 'component', pull: 'clone', put: false }"
          :sort="false"
          :clone="cloneDog"
          @start="viewComponentStartMoveHandle"
          @end="viewComponentEndMoveHandle"
        >
          <div
            :title="c.name"
            :class="['layer-manager-com','layer-manager-item','layer-manager-thumbail-wrap'] "
            v-for="c in viewComponents"
            :key="c.key"
            @click="selectedComponent(c.key)"
          >
            <img class="layer-item-thumbail" :src="c.img" :alt="c.name" />
            <div class="layer-manager-thumbail">
              <span class="layer-item-span">{{c.name}}</span>
            </div>
            <div class="layer-thumbail-item"></div>
          </div>
        </draggable>
      </div>

      <div class="right-edit-main">
        <div class="editor-panel-wp">
          <div class="editor-layer-wp">
            <vue-draggable-resizable
              :w="c.width"
              :h="c.height"
              :parent="true"
              :debug="false"
              :min-width="c.width"
              :min-height="c.height"
              :x="c.x"
              :y="c.y"
              :lock-aspect-ratio="true"
              v-for="(c, idx) in layerComponents"
              :key="idx"
              :active="selectedComponentId === c.id"
              @activated="layerComponentActived(c)"
            >
              <component v-bind:is="c.key" />
            </vue-draggable-resizable>
          </div>
        </div>
        <draggable
          class="target-draggable-wp"
          :list="targetDraggableComponents"
          :sort="false"
          group="component"
          @change="componentsChangeHandle"
          v-show="showTargetDraggableWrapper"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import draggable from "vuedraggable";
import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";

export default {
  name: "Home",
  components: {
    draggable,
    VueDraggableResizable,
  },
  data() {
    return {
      selectedComponentId: "",
      viewComponents: [
        {
          name: "双轴折线图",
          key: "h-component-1",
          img: "http://file.geeker.com.cn/uploadfile/server/wl-cloud/cultural-tourism-cloud/c1.png",
          width: 150,
          height: 89,
        },
        {
          name: "百分比占比条形图",
          key: "h-component-2",
          img: "http://file.geeker.com.cn/uploadfile/server/wl-cloud/cultural-tourism-cloud/c2.png",
          width: 150,
          height: 90,
        },
        {
          name: "瀑布图",
          key: "h-component-3",
          img: "http://file.geeker.com.cn/uploadfile/server/wl-cloud/cultural-tourism-cloud/c3.png",
          width: 150,
          height: 90,
        },
      ],
      targetDraggableComponents: [],
      layerComponents: [],
      showTargetDraggableWrapper: false,
      // 即将添加的组件
      toBeAddedComponent: {},
    };
  },
  methods: {
    selectedComponent(id) {
      this.selectedComponentId = id;
    },
    cloneDog({ key, width, height, img, name }) {
      return {
        key,
        width,
        height,
        img,
        name,
        x: 0,
        y: 0,
        id: uuidv4(),
      };
    },
    componentsChangeHandle(evt) {
      let { element } = evt.added;
      this.toBeAddedComponent = element;
    },
    viewComponentStartMoveHandle(a) {
      this.toBeAddedComponent = {}
      this.showTargetDraggableWrapper = true;
    },
    viewComponentEndMoveHandle({ originalEvent }) {
      if (!Object.keys(this.toBeAddedComponent).length) {
        return false
      }
      let { offsetX, offsetY } = originalEvent;
      this.showTargetDraggableWrapper = false;
      
      let { width, height } = this.toBeAddedComponent;
      this.toBeAddedComponent.x = offsetX - width / 2;
      this.toBeAddedComponent.y = offsetY - height / 2;
      this.layerComponents.push(this.toBeAddedComponent);
    },
    layerComponentActived(component) {
      this.selectedComponentId = component.id
    },
  },
};
</script>

<style lang="scss" scoped>
.screen-edit {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .screen-header {
    position: relative;
    height: 41px;
    padding-right: 8px;
    display: flex;
    z-index: 100;
    align-items: center;
    user-select: none;
    color: #a1aeb3;
    background: var(--datav-header-bg-color);
    border-bottom: 1px solid #000;
    h3 {
      padding: 24px;
      color: #999;
    }
  }
  &-main {
    flex: 1;
    z-index: 1;
    display: flex;
    flex-wrap: nowrap;
    position: relative;
    overflow: hidden;
    background: var(--datav-main-bg);
  }
  .layer-panel-wp {
    flex: none;
    position: relative;
    width: 200px;
    height: 100%;
    background: #1d1f26;
    display: flex;
    flex-direction: column;
    transition: width 0.3s ease;
    z-index: 5;
    overflow: hidden;
    border-right: 1px solid #000;
  }
  .right-edit-main {
    flex: 1;
    flex-direction: column;
    display: flex;
    overflow: hidden;
    height: 100%;
    z-index: 2;
    position: relative;
    .layer-manager-item {
      display: none;
    }
  }
  .editor-panel-wp {
    width: calc(100% - 120px);
    height: calc(100% - 120px);
    display: flex;
    position: relative;
    transform-origin: 0 0;
    top: 60px;
    left: 60px;
    transition: 0.2s all ease-in-out;
    background-size: cover, contain;
    background-position: center, right bottom;
    background-repeat: no-repeat, no-repeat;
    box-shadow: rgba(0, 0, 0, 0.5) 0 0 30px 0;
    background-image: url(//datav.oss-cn-hangzhou.aliyuncs.com/uploads/templates/7.png);
  }
  .layer-manager-wrap {
    flex: auto;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    color: #bcc9d4;
    font-size: 12px;
    list-style: none;
    line-height: 2;
    user-select: none;
    position: relative;
    background: var(--datav-panel-color);
  }
  .layer-manager-item {
    width: 100%;
    max-width: 196px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 48px;
    padding: 0 6px;
    position: relative;
    background: var(--datav-panel-item-bg);
    transition: background 0.2s;
    cursor: pointer;
    flex: none;
    &.selected {
      background: var(--datav-sub-main-color);
      color: #fff;
    }
    .layer-manager-thumbail-wrap {
      height: 48px;
    }
    .layer-item-thumbail {
      width: 53px;
      height: 34px;
      flex: none;
      display: block;
      border: 1px solid #3a4659;
      background: #282a30;
    }
    .layer-manager-thumbail {
      flex: auto;
      margin-left: 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .layer-manager-item .layer-item-span {
      flex: auto;
      text-indent: 7px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .editor-layer-wp {
    position: relative;
    flex: 1;
  }
  .target-draggable-wp {
    position: absolute;
    width: calc(100% - 120px);
    height: calc(100% - 120px);
    top: 60px;
    left: 60px;
  }
  .panel-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    background: var(--datav-panel-title-bg);
    color: #bcc9d4;
    padding: 10px;
    margin: 0;
    user-select: none;
  }
}
</style>
