<!-- tab组件: <me-tabs v-model="tabIndex" :tabs="tabs" @change="tabChange"></me-tabs> -->
<template>
  <view style="margin-top: 10px;">
    <u-scroll-list :indicator='true' :indicatorWidth='0' class="hide-scrollbar">
      <view class="scroll-list" style="flex-direction: row;">
        <view style="margin: 0 5px;width: max-content;" v-for="(item,i) in tabs" :key="i" class="scroll-list__goods-item scroll-list__goods-item--no-margin-right">
          <u-tag @click="changeTagEvent(i)" :bgColor="activeIndex===i?'#3287FF':'#F2F1F6'" :color="activeIndex===i?'#FFF':'#6A6A6C'" :borderColor="activeIndex===i?'#3287FF':'#F2F1F6'" :text="getTabName(item)" plain size="mini" type="warning"></u-tag>
        </view>
      </view>
    </u-scroll-list>
  </view>
</template>

<script>
export default {
  model: {
    prop: 'activeIndex',
    event: 'updateActiveIndex', // 随便命名事件，对应下面$emit即可
  },
  props: {
    tabs: { // 支持格式: ['全部', '待付款'] 或 [{name:'全部'}, {name:'待付款'}]
      type: Array,
      default() {
        return []
      }
    },
    props: { // tabs的字段名,默认为name
      type: Object,
      default() {
        return {
          label: 'label',
          value: 'value'
        }
      }
    },
    nameKey: { // 取name的字段
      type: String,
      default: 'name'
    },
    activeIndex: { // 当前显示的下标 (使用v-model语法糖: 1.props需为value; 2.需回调input事件)
      type: [String, Number],
      default: 0
    },
  },
  data() {
    return {


    }
  },
  mounted() {
  },
  methods: {
    changeTagEvent(i) {
      this.$emit('updateActiveIndex', i)
      this.$emit('change', i)
    },
    getTabName(tab) {
      return typeof tab === "object" ? tab[this.props.label] : tab
    },
  }
}
</script>

<style lang="scss">
//新样式
.scroll-list {
  @include flex(column);
  &__goods-item {
    margin-right: 20px;
    &__image {
      width: 60px;
      height: 60px;
      border-radius: 4px;
    }
  }
  &__show-more {
    background-color: #fff0f0;
    border-radius: 3px;
    padding: 3px 6px;
    @include flex(column);
    align-items: center;
  }
  &__line {
    @include flex;
    margin-top: 10px;
    &__item {
      margin-right: 15px;
      &__image {
        width: 61px;
        height: 48px;
      }
      &--no-margin-right {
        margin-right: 0;
      }
    }
  }
}
.hide-scrollbar {
  ::v-deep .u-scroll-list__scroll-view .uni-scroll-view {
    .uni-scroll-view {
      overflow: auto !important;
    }
    .uni-scroll-view::-webkit-scrollbar {
      display: none;
    }
  }
  ::v-deep .u-scroll-list__indicator {
    margin: 0;
    height: 0;
  }
}
</style>
