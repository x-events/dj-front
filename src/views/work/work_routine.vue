<template>
  <div class="flex-col">
    <work-channel-bar/>

    <div class="flex-1 mainCont flex-row">
      <div class="menu scrollbar">
        <ul>
          <template v-for="(item,index) in subMenu">
            <template v-if="item.children">
              <li :key="'menu'+index">
                {{item.name}}
                <ul>
                  <li
                    v-for="(subItem,subIndex) in item.children"
                    :key="'sub'+subIndex"
                    :class="{'cur': $route.path.indexOf(`/work/routine/${item.path}/`+subItem.path.replace(new RegExp(`/work/routine/${item.path}/`),''))===0}"
                    @click="$router.push(subItem)"
                  >{{subItem.name}}</li>
                </ul>
              </li>
            </template>
            <template v-else>
              <li
                :key="'menu'+index"
                :class="{'cur': item.name===$route.name}"
                @click="$router.push(item)"
              >{{item.name}}</li>
            </template>
          </template>
        </ul>
      </div>

      <router-view class="content flex-1 scrollbar"/>
    </div>
  </div>
</template>

<script>
import workChannelBar from "@/components/work/workChannelBar";

export default {
  components: {
    workChannelBar
  },
  data() {
    return {
      subMenu: []
    };
  },
  created: function() {
    let menu = this.$router.options.routes[0]
      ? this.$router.options.routes[0].children
      : [];

    menu = menu.filter(e => {
      return e.name === "工作记实";
    })[0];

    if (menu && menu.children) {
      menu = menu.children.filter(e => {
        return e.name === "日常事务";
      })[0];

      if (menu && menu.children) {
        return (this.subMenu = menu.children);
      }
    }

  }
};
</script>

<style scoped>
.mainCont {
  padding: 12px;
}
.mainCont .menu {
  width: 180px;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  margin-right: 10px;
}
.mainCont .menu ul li {
  line-height: 46px;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  text-indent: 1em;
}
.mainCont .menu .cur {
  background-color: #0e43cf;
  color: #fff;
}
.mainCont .menu li li {
  padding-left: 1em;
}

.mainCont .content {
  padding: 8px 16px 16px;
  border-radius: 10px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  height: 100%;
  background:url(../../assets/img/work/block_b.png) right bottom no-repeat #fff;
  box-sizing: border-box;
}
</style>

