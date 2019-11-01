<template>
  <div class="pull-down-container">
    <v-container>
      <slot></slot>
    </v-container>
  </div>
</template>

<script>
  import PullToRefresh from 'pulltorefreshjs'

	export default {
		props: {
			onRefresh: {
				type: Function
			}
		},
		data() {
			return {
			}
		},
		activated() {
			this.$nextTick(() => {
        var vue = this
				PullToRefresh.init({
          mainElement: '.pull-down-container',
          onRefresh() {
            return vue.onRefresh()
          },
          getStyles() {
            return `
              @import url("https://fonts.googleapis.com/css?family=Poppins:400,500,700,900&display=swap");

              .__PREFIX__ptr {
                pointer-events: none;
                font-size: 0.85em;
                font-weight: bold;
                font-family: "Poppins", sans-serif;
                top: 0;
                height: 0;
                transition: height 0.3s, min-height 0.3s;
                text-align: center;
                width: 100%;
                overflow: hidden;
                display: flex;
                align-items: flex-end;
                align-content: stretch;
                background-color: #2c3133;
              }
              .__PREFIX__box {
                padding: 10px;
                flex-basis: 100%;
              }
              .__PREFIX__pull {
                transition: none;
              }
              .__PREFIX__text {
                margin-top: .33em;
                color: #d5d5d5;
              }
              .__PREFIX__icon {
                color: #d5d5d5;
                transition: transform .3s;
              }
              /*
              When at the top of the page, disable vertical overscroll so passive touch
              listeners can take over.
              */
              .__PREFIX__top {
                touch-action: pan-x pan-down pinch-zoom;
              }
              .__PREFIX__release {
                .__PREFIX__icon {
                  transform: rotate(180deg);
                }
              }
            `
          }
        })
			})
    },
    deactivated() {
      PullToRefresh.destroyAll()
    }
	}
</script>

<style>
	.pull-down-container {
    height: 100%;
    max-height: 100%;
    overflow-y: auto;
  }
</style>