<template>
  <div class="commonProcess flex-row align-center justify-center">
    <div class="_item" v-for="(type,index) in finnalList" :key="'type'+index">
      <div class="_hd">{{type.title}}</div>
      <ul class="_list">
        <li
          v-for="(item,i) in type.items"
          :key="'item'+i"
          @click="$emit('quick', item)"
        >{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
const list = [
  {
    title: "新建会议",
    items: [
      {
        id: 42,
        name: "支部党员大会",
        type: 3
      },
      {
        id: 43,
        name: "支委会会议",
        type: 3
      },
      {
        id: 46,
        name: "党（工）委会",
        type: 3
      },
      {
        id: 44,
        name: "党小组会",
        type: 3
      }
    ]
  },
  {
    title: "新建学习",
    items: [
      {
        id: 45,
        name: "党课",
        type: 3
      },
      {
        id: 79,
        name: "党内培训",
        type: 3
      },
      {
        id: 85,
        name: "学习强国",
        type: 3
      },
      {
        id: 138,
        name: "测试所有组件",
        type: 3
      }
    ]
  },
  {
    title: "新建服务",
    items: [
      {
        id: 96,
        name: "公益志愿服务",
        type: 3
      },
      {
        id: 95,
        name: "走访入户",
        type: 3
      },
      {
        id: 94,
        name: "重点服务项目",
        type: 3
      },
      {
        id: 93,
        name: "为民办实事",
        type: 3
      }
    ]
  }
];

export default {
  props: {
    rights: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      finnalList: []
    };
  },
  watch: {
    rights: function() {
      this.finnalList = list.map(cat => {
        cat.items = cat.items.filter(sub => {
          return this.rights.indexOf(sub.id) !== -1;
        });
        return cat;
      });
    }
  },
  created: function(){
    if(this.rights.length){
      this.finnalList = list.map(cat => {
        cat.items = cat.items.filter(sub => {
          return this.rights.indexOf(sub.id) !== -1;
        });
        return cat;
      });
    }
    
  }
};
</script>

<style scoped>
.commonProcess {
  text-align: center;
}
.commonProcess ._item {
  position: relative;
  display: inline-block;
  width: 283px;
  height: 306px;
  margin: 50px 12px 0;
  background: linear-gradient(
    150deg,
    rgba(56, 65, 194, 1),
    rgba(63, 182, 245, 1)
  );
  border-radius: 6px;
  color: #fff;
}
.commonProcess ._item::before,
.commonProcess ._item::after {
  content: "";
  position: absolute;
  z-index: 1;
  background-repeat: no-repeat;
}
.commonProcess ._item::before {
  width: 110px;
  height: 93px;
  background-image: url(../../assets/img/work/common-shadow1.png);
  left: 0;
  top: 0;
}
.commonProcess ._item::after {
  width: 25px;
  height: 14px;
  background-image: url(../../assets/img/work/channel-shadow1.png);
  bottom: 12px;
  right: 12px;
}
.commonProcess ._item ._hd {
  text-align: left;
  height: 52px;
  line-height: 52px;
  font-size: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-left: 50px;
  background-repeat: no-repeat;
  background-position: 15px center;
  background-image: url(../../assets/img/work/common-icon1.png);
}
.commonProcess ._item ._list {
  position: relative;
  z-index: 2;
  padding: 20px 56px;
}
.commonProcess ._item ._list li {
  cursor: pointer;
  height: 42px;
  line-height: 42px;
  overflow: hidden;
  background: linear-gradient(
    195deg,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.02)
  );
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  margin-bottom: 10px;
  opacity: 0.8;
}
.commonProcess ._item ._list li:hover {
  opacity: 1;
}
.commonProcess ._item:nth-child(2) {
  background: linear-gradient(
    135deg,
    rgba(255, 164, 34, 1),
    rgba(243, 87, 45, 1)
  );
}
.commonProcess ._item:nth-child(2) ._hd {
  background-image: url(../../assets/img/work/common-icon2.png);
}
.commonProcess ._item:nth-child(3) {
  background: linear-gradient(
    150deg,
    rgba(128, 54, 230, 1),
    rgba(192, 76, 224, 1)
  );
}
.commonProcess ._item:nth-child(3) ._hd {
  background-image: url(../../assets/img/work/common-icon3.png);
}
</style>
