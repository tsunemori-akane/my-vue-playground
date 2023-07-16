<!-- <desc>
  如果使用render函数， 该列指定了prop属性的话，render的第一个参数是该列对应数据项，第二个参数才是scope配置项
  </desc> -->
<template>
  <div>
    <jsxTable :column="column" :data="tableData" row-key="id" />
  </div>
</template>
  
<script setup lang="tsx">
const column = [
  {
    label: "名字",
    align: "left",
    prop: "name",
    showOverflowTooltip: true,
    render: (data, scope) => {
      const { row, column } = scope;
      const propKey = column.property;
      return (
        <span>
          {row[propKey]}+{data}
        </span>
      );
    },
  },
  {
    prop: "size",
    label: "size",
  },
  {
    prop: "address",
    label: "地址",
  },
];
const tableData = [
  {
    id: "1",
    size: "C",
    name: "hazel moore",
    address: "hazel moore",
    children: [
      {
        id: "1.1",
        size: "C",
        name: "I love this whore",
        address: "hazel moore",
      }
    ]
  },
  {
    id: "2",
    size: "D",
    name: "madison moores",
    address: "madison moores",
  },
  {
    id: "3",
    size: "F",
    name: "firtsbornunicorn",
    address: "firtsbornunicorn",
  },
  {
    id: "4",
    size: "F",
    name: "octavia red",
    address: "octavia red",
  },
  {
    id: "5",
    size: "D",
    name: "Anny walker & Bellamurr",
    address: "Anny walker & Bellamurr",
  },
  {
    id: "6",
    size: "D",
    name: "Brooke Tilli",
    address: "Brooke Tilli",
  },
];
</script>
  
<style lang="scss" scoped></style>