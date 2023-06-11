<template>
  <div class="selector">
    <ElInput v-model="inputValue" @click="visible = !visible">
      <template #append>
        <ElPopover
          :popper-option="{
            placement: 'auto'
          }"
          :visible="visible"
          :width="350"
          popper-class="pure-popper"
        >
          <template #reference>
            <div
              class="w-40px h-32px cursor-pointer flex justify-center items-center"
              @click="visible = !visible"
            >
              <SvgIcon :icon="currentActiveType + icon"></SvgIcon>
            </div>
          </template>

          <ElInput v-model="filterValue" class="p-2" clearable placeholder="搜索图标" />
          <ElDivider border-style="dashed" />

          <ElTabs v-model="currentActiveType" @tab-click="handleClick">
            <ElTabPane
              v-for="(pane, index) in tabsList"
              :key="index"
              :label="pane.label"
              :name="pane.name"
            >
              <ElDivider border-style="dashed" class="tab-divider" />
              <ElScrollbar>
                <ul class="flex flex-wrap px-2 ml-2">
                  <li
                    v-for="(item, key) in pageList"
                    :key="key"
                    :style="iconItemStyle(item)"
                    :title="item"
                    class="icon-item p-2 w-1/10 cursor-pointer mr-2 mt-1 flex justify-center items-center"
                    @click="onChangeIcon(item)"
                  >
                    <SvgIcon :icon="currentActiveType + item"></SvgIcon>
                  </li>
                </ul>
              </ElScrollbar>
            </ElTabPane>
          </ElTabs>
          <ElDivider border-style="dashed"></ElDivider>
          <ElPagination
            class="flex items-center justify-center h-10"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="iconCount"
            background
            layout="prev, pager, next"
            small
            @current-change="onCurrentChange"
          ></ElPagination>
        </ElPopover>
      </template>
    </ElInput>
  </div>
</template>
<script lang="ts" setup>
import { CSSProperties } from "vue";
import { IconJson } from "./data";
import { ElDivider, ElPagination, ElScrollbar, ElTabPane, ElTabs } from "element-plus";
import { SvgIcon } from ".";
import { cloneDeep } from "lodash-es";

type ParameterCSSProperties = (item?: string) => CSSProperties | undefined;

const props = defineProps({
  modelValue: {
    require: true,
    type: String
  }
});

const emit = defineEmits<{ (e: "update:modelValue", v: string) }>();
const visible = ref(false);
const inputValue = toRef(props, "modelValue");
const iconList = ref(IconJson);
const icon = ref("add-location");
const currentActiveType = ref("ep:");
// 深拷贝图标数据，前端做搜索
const copyIconList = cloneDeep(iconList.value);
// 搜索条件
const filterValue = ref<string>("");

const pageSize = ref(96);
const currentPage = ref(1);

const tabsList = [
  {
    label: "Element Plus",
    name: "ep:"
  },
  {
    label: "Font Awesome 4",
    name: "fa:"
  },
  {
    label: "Font Awesome 5 Solid",
    name: "fa-solid:"
  }
];

const pageList = computed(() => {
  if (currentPage.value === 1) {
    return copyIconList[currentActiveType.value]
      .filter((v: string[]) => v.includes(filterValue.value))
      .slice(currentPage.value - 1, pageSize.value);
  } else {
    return copyIconList[currentActiveType.value]
      .filter((v: string[]) => v.includes(filterValue.value))
      .slice(
        (currentPage.value - 1) * pageSize.value,
        (currentPage.value - 1) * pageSize.value + pageSize.value
      );
  }
});

const iconCount = computed(() => {
  return copyIconList[currentActiveType.value] == undefined
    ? 0
    : copyIconList[currentActiveType.value].length;
});

const iconItemStyle = computed((): ParameterCSSProperties => {
  return item => {
    if (inputValue.value === currentActiveType.value + item) {
      return {
        borderColor: "var(--el-color-primary)",
        color: "var(--el-color-primary)"
      };
    }
  };
});

const handleClick = ({ props }) => {
  currentPage.value = 1;
  currentActiveType.value = props.name;
  emit("update:modelValue", currentActiveType.value + iconList.value[currentActiveType.value][0]);
  icon.value = iconList.value[currentActiveType.value][0];
};

const onChangeIcon = (item: string) => {
  icon.value = item;
  emit("update:modelValue", currentActiveType.value + item);
  visible.value = false;
};
const onCurrentChange = (page: number) => (currentPage.value = page);
watch(
  () => {
    return props.modelValue;
  },
  () => {
    if (props.modelValue && props.modelValue.indexOf(":") >= 0) {
      currentActiveType.value = props.modelValue.substring(0, props.modelValue.indexOf(":") + 1);
      icon.value = props.modelValue.substring(props.modelValue.indexOf(":") + 1);
    }
  }
);
watch(
  () => {
    return filterValue.value;
  },
  () => {
    currentPage.value = 1;
  }
);
</script>
<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 1px auto !important;
}
.tab-divider.el-divider--horizontal {
  margin: 0 !important;
}

.icon-item {
  &:hover {
    border-color: var(--el-color-primary);
    color: var(--el-color-primary);
    transition: all 0.4s;
    transform: scaleX(1.05);
  }
}

:deep(.el-tabs__nav-next) {
  font-size: 15px;
  line-height: 32px;
  box-shadow: -5px 0 5px -6px #ccc;
}

:deep(.el-tabs__nav-prev) {
  font-size: 15px;
  line-height: 32px;
  box-shadow: 5px 0 5px -6px #ccc;
}

:deep(.el-input-group__append) {
  padding: 0;
}

:deep(.el-tabs__item) {
  font-size: 12px;
  font-weight: normal;
  height: 30px;
  line-height: 30px;
}

:deep(.el-tabs__header),
:deep(.el-tabs__nav-wrap) {
  margin: 0;
  position: static;
}
</style>
