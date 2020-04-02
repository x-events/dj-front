<template>
  <div class="header" :class="{closed: !headPosition}">
      
      <el-dropdown class="menu" trigger="click" @command="handleCommand">
        <div class="trigger"></div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item,index) in $router.options.routes[0].children" :key="'nav'+index"
            :command="item">{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      
      <div class="logo"
        :class="{flip:flipLogo, shine: shineLogo}">
        <div class="logo_svg">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" >
          <defs>
              <clipPath id="clipPath">
                  <circle cx="35" cy="35" r="35" fill="#34538b" />
              </clipPath>
          </defs>
          <path class="path" 
            :class="{fillLogo}"
            d="M36.193,10.903
    c1.838,0.996,3.571,2.118,5.282,3.318c8.747,6.26,14.071,18.07,8.25,27.995c-6.044-5.298-12.096-10.59-18.12-15.91
    c1.85-2.06,3.702-4.121,5.547-6.186c-1.15-1.03-2.3-2.063-3.449-3.094c-1.749,1.771-4.202,1.888-6.126,0.319
    c-4.204,4.675-8.394,9.364-12.6,14.037c2.23,2,4.462,4,6.693,6c1.342-1.472,2.666-2.965,3.993-4.452
    c6.059,5.355,12.172,10.651,18.231,16.006c-9.042,5.505-19.962,2.896-27.585-3.644l-0.086-0.096
    c-1.086,1.277-2.172,2.555-3.259,3.832c1.255,1.177,2.682,2.375,3.806,3.668c-0.331,0.403-0.657,0.813-0.986,1.219
    c-5.027-0.931-6.111,6.946-0.525,7.238c2.501-0.375,4.136-2.574,3.205-5.016c0.314-0.385,0.625-0.773,0.938-1.158
    c9.547,6.794,21.426,6.633,30.868-0.448c1.595,1.403,3.196,2.8,4.79,4.205c1.94-2.241,3.9-4.468,5.857-6.694
    c-1.576-1.388-3.158-2.771-4.734-4.158c1.522-2.217,2.765-4.539,3.508-7.135C62.271,22.144,51.938,11.969,36.193,10.903"/>
          </svg>
        </div>
        <div class="logo_color">

        </div>
      </div>
      <h1 class="h1title" :class="{closed: !showTitle}">
        八里庄街道基层党建规范化可视平台
      </h1>

    </div>
</template>

<script>
export default {
  name: "header3",
  data() {
    return {
      fillLogo: false,
      headPosition: false,
      flipLogo: false,
      showTitle: false,
      shineLogo: false
    };
  },
  watch: {
    fillLogo: function(fillLogo) {
      if (fillLogo) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.headPosition = true;
          }, 700);
        });
      }
    },
    headPosition: function(headPosition) {
      if (headPosition) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$emit("opened");
          }, 270)
          setTimeout(() => {
            this.flipLogo = true;
          }, 700);
        });
      }
    },
    flipLogo: function(flipLogo) {
      if (flipLogo) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.showTitle = true;
          }, 300);
        });
      }
    },
    showTitle: function(showTitle) {
      if (showTitle) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.shineLogo = true;
          }, 300);
        });
      }
    }
  },
  methods: {
    handleCommand: function(item) {
      this.$router.push(item);
    }
  },
  mounted: function() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.fillLogo = true;
      }, 1450);
    });
    // var path = document.querySelector('.path');
    // var length = path.getTotalLength();
    // console.log(length)
  }
};
</script>

<style scoped>
.header {
  position: absolute;
  left: 0;
  width: 100%;
  top: 0;
  height: 70px;
  overflow: hidden;
  background: #203b84;
  transition: all ease 0.7s;
  z-index: 9;
}
.header .logo {
  position: absolute;
  left: 0%;
  margin-top: -35px;
  top: 50%;
  height: 70px;
  width: 70px;
  overflow: hidden;
  /* background:url(../assets/img/logo-w.png) center /auto 50% no-repeat; */
  transition: all ease 0.7s;
  z-index: 3;
}
.header .logo.shine {
  clip-path: url(#clipPath);
}
.header .logo.shine::after {
  position: absolute;
  left: -100%;
  top: 0;
  width: 30%;
  height: 100%;
  content: "";
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-45deg);
  z-index: 9;
  animation-name: shine;
  animation-duration: 5s;
  animation-delay: 2s;
  animation-timing-function: ease-out;
  animation-iteration-count: infinite;
}

@keyframes shine {
  0% {
    left: -100%;
  }
  10% {
    left: 150%;
  }
  100% {
    left: 150%;
  }
}

.logo_svg,
.logo_color {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s ease 0.1s;
}
.logo_svg {
  z-index: 2;
  background: #203b84;
}
.logo_color {
  z-index: 1;
  background: url(../assets/img/logo-y.png) center no-repeat #203b84;
  background-size: 50px 50px;
  transform: rotateY(180deg);
}
.logo.flip .logo_svg {
  transform: rotateY(180deg);
}
.logo.flip .logo_color {
  transform: rotateY(360deg);
}
.logo.flip .logo_color {
  z-index: 3;
}

.header .h1title {
  position: relative;
  float: left;
  margin-left: 70px;
  padding-left: 20px;
  height: 70px;
  line-height: 70px;
  color: #fff;
  font-size: 26px;
  letter-spacing: 1px;
  overflow: hidden;
  z-index: 1;
}
.header .h1title:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin-left: 100%;
  transition: all linear 2s;
  background: -moz-linear-gradient(
    left,
    rgba(32, 59, 132, 0) 0%,
    rgba(32, 59, 132, 0.14) 1%,
    rgba(32, 59, 132, 1) 5%,
    rgba(32, 59, 132, 1) 100%
  );
  background: -webkit-linear-gradient(
    left,
    rgba(32, 59, 132, 0) 0%,
    rgba(32, 59, 132, 0.14) 1%,
    rgba(32, 59, 132, 1) 5%,
    rgba(32, 59, 132, 1) 100%
  );
  background: linear-gradient(
    to right,
    rgba(32, 59, 132, 0) 0%,
    rgba(32, 59, 132, 0.14) 1%,
    rgba(32, 59, 132, 1) 5%,
    rgba(32, 59, 132, 1) 100%
  );
}
.header .h1title.closed::after {
  margin-left: 0;
}

.header .menu {
  position: absolute;
  right: 0;
  top: 0;
  height: 70px;
}
.header .trigger {
  width: 100px;
  height: 100%;
  background: url(../assets/img/menu.png) center no-repeat #e2392e;
  cursor: pointer;
}

.header.closed {
  height: 100%;
}
.header.closed .logo {
  left: 50%;
  margin-left: -35px;
  transform: scale(2);
}

.path {
  fill-rule: evenodd;
  clip-rule: evenodd;
  fill: none;
  stroke: #fff;
  stroke-miterlimit: 10;
  stroke-dasharray: 310;
  stroke-dashoffset: 310;
  animation-name: dash;
  animation-duration: 2s;
  animation-timing-function: ease-out;
  animation-iteration-count: 1;
  fill: transparent;
  transition: fill ease 0.7s;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

.path.fillLogo {
  stroke-dasharray: 0;
  stroke-dashoffset: 0;
  fill: #fff;
}
</style>
