<template>
	<div class="vue-cropper" ref="cropper" @mouseover="scaleImg" @mouseout="cancleScale">
		<div class="cropper-box">
			<div class="cropper-box-canvas"
			 	v-show="!loading"
				:style="{
					'width': trueWidth + 'px',
					'height': trueHeight + 'px',
					'transform': 'scale(' + scale + ',' + scale + ') ' + 'translate3d('+ x / scale + 'px,' + y / scale + 'px,' + '0)'
					+ 'rotateZ('+ rotate * 90 +'deg)'
					}"
          >
				<img
					:src="imgs"
					alt="cropper-img"
					ref="cropperImg"
					/>
			</div>
		</div>
		<div
			class="cropper-drag-box"
		  :class="{'cropper-move': move && !crop, 'cropper-crop': crop, 'cropper-modal': cropping}"
			@mousedown="startMove"
      @touchstart="startMove"
			>
			</div>
			<div
				v-show="cropping"
				class="cropper-crop-box"
				:style="{
					'width': cropW + 'px',
					'height': cropH + 'px',
					'transform': 'translate3d('+ cropOffsertX + 'px,' + cropOffsertY + 'px,' + '0)'
				}">
				<span class="cropper-view-box">
					<img
					:style="{
						'width': trueWidth + 'px',
						'height': trueHeight + 'px',
						'transform': 'scale(' + scale + ',' + scale + ') ' + 'translate3d('+ (x - cropOffsertX) / scale  + 'px,' + (y - cropOffsertY) / scale + 'px,' + '0)'
						+ 'rotateZ('+ rotate * 90 +'deg)'
						}"
						:src="imgs"
						alt="cropper-img"
						/>
				</span>
				<span
				  class="cropper-face cropper-move"
					@mousedown="cropMove"
		      @touchstart="cropMove"
				></span>
				<span class="crop-info" v-if="info" :style="{'top': cropInfo.top}">
          {{  this.cropInfo.width }} × {{ this.cropInfo.height }}
        </span>
				<span v-if="!fixedBox">
					<span class="crop-line line-w" @mousedown="changeCropSize($event, false, true, 0, 1)" @touchstart="changeCropSize($event, false, true, 0, 1)"></span>
					<span class="crop-line line-a" @mousedown="changeCropSize($event, true, false, 1, 0)" @touchstart="changeCropSize($event, true, false, 1, 0)"></span>
					<span class="crop-line line-s" @mousedown="changeCropSize($event, false, true, 0, 2)" @touchstart="changeCropSize($event, false, true, 0, 2)"></span>
					<span class="crop-line line-d" @mousedown="changeCropSize($event, true, false, 2, 0)" @touchstart="changeCropSize($event, true, false, 2, 0)"></span>
					<span class="crop-point point1" @mousedown="changeCropSize($event, true, true, 1, 1)" @touchstart="changeCropSize($event, true, true, 1, 1)"></span>
					<span class="crop-point point2" @mousedown="changeCropSize($event, false, true, 0, 1)" @touchstart="changeCropSize($event, false, true, 0, 1)"></span>
					<span class="crop-point point3" @mousedown="changeCropSize($event, true, true, 2, 1)" @touchstart="changeCropSize($event, true, true, 2, 1)"></span>
					<span class="crop-point point4" @mousedown="changeCropSize($event, true, false, 1, 0)" @touchstart="changeCropSize($event, true, false, 1, 0)"></span>
					<span class="crop-point point5" @mousedown="changeCropSize($event, true, false, 2, 0)" @touchstart="changeCropSize($event, true, false, 2, 0)"></span>
					<span class="crop-point point6" @mousedown="changeCropSize($event, true, true, 1, 2)" @touchstart="changeCropSize($event, true, true, 1, 2)"></span>
					<span class="crop-point point7" @mousedown="changeCropSize($event, false, true, 0, 2)" @touchstart="changeCropSize($event, false, true, 0, 2)"></span>
					<span class="crop-point point8" @mousedown="changeCropSize($event, true, true, 2, 2)" @touchstart="changeCropSize($event, true, true, 2, 2)"></span>
				</span>
		</div>
	</div>
</template>

<script>
import exif from "exif-js";
export default {
  data: function() {
    return {
      // 容器高宽
      w: 0,
      h: 0,
      // 图片缩放比例
      scale: 1,
      // 图片偏移x轴
      x: 0,
      // 图片偏移y轴
      y: 0,
      // 图片加载
      loading: true,
      // 图片真实宽度
      trueWidth: 0,
      // 图片真实高度
      trueHeight: 0,
      move: true,
      // 移动的x
      moveX: 0,
      // 移动的y
      moveY: 0,
      // 开启截图
      crop: false,
      // 正在截图
      cropping: false,
      // 裁剪框大小
      cropW: 0,
      cropH: 0,
      cropOldW: 0,
      cropOldH: 0,
      // 判断是否能够改变
      canChangeX: false,
      canChangeY: false,
      // 改变的基准点
      changeCropTypeX: 1,
      changeCropTypeY: 1,
      // 裁剪框的坐标轴
      cropX: 0,
      cropY: 0,
      cropChangeX: 0,
      cropChangeY: 0,
      cropOffsertX: 0,
      cropOffsertY: 0,
      // 支持的滚动事件
      support: "",
      // 移动端手指缩放
      touches: [],
      touchNow: false,
      // 图片旋转
      rotate: 0,
      isIos: false,
      orientation: 0,
      imgs: "",
      // 图片缩放系数
      coe: 0.2,
      // 是否正在多次缩放
      scaling: false,
      scalingSet: "",
			coeStatus: ""
    };
  },
  props: {
    img: {
      type: [String, Blob, null, File],
      default: ""
    },
    // 输出图片压缩比
    outputSize: {
      type: Number,
      default: 1
    },
    outputType: {
      type: String,
      default: "jpeg"
    },
    info: {
      type: Boolean,
      default: true
    },
    // 是否开启滚轮放大缩小
    canScale: {
      type: Boolean,
      default: true
    },
    // 是否自成截图框
    autoCrop: {
      type: Boolean,
      default: false
    },
    autoCropWidth: {
      type: Number,
      default: 0
    },
    autoCropHeight: {
      type: Number,
      default: 0
    },
    // 是否开启固定宽高比
    fixed: {
      type: Boolean,
      default: false
    },
    // 宽高比 w/h
    fixedNumber: {
      type: Array,
      default: () => {
        return [1, 1];
      }
    },
    // 固定大小 禁止改变截图框大小
    fixedBox: {
      type: Boolean,
      default: false
    },
    // 输出截图是否缩放
    full: {
      type: Boolean,
      default: false
    },
    // 是否可以拖动图片
    canMove: {
      type: Boolean,
      default: true
    },
    // 是否可以拖动截图框
    canMoveBox: {
      type: Boolean,
      default: true
    },
    // 上传图片按照原始比例显示
    original: {
      type: Boolean,
      default: false
		},
		// 截图框能否超过图片
		centerBox: {
			type: Boolean,
      default: false
		},
		// 是否根据dpr输出高清图片
		high: {
			type: Boolean,
			default: true
    },
    // 截图框展示宽高类型
    infoTrue: {
      type: Boolean,
      default: false
    },
    // 可以压缩图片宽高  默认不超过200
    maxImgSize: {
      type: Number,
      default: 2000
    }
  },
  computed: {
    cropInfo() {
      let obj = {}
      obj.top = this.cropOffsertY > 21 ? '-21px' : '0px'
      obj.width = this.cropW > 0 ? this.cropW : 0
      obj.height = this.cropH > 0 ? this.cropH : 0
      if (this.infoTrue) {
        if (this.high && !this.full) {
          let dpr =  window.devicePixelRatio
          obj.width = obj.width * dpr
          obj.height = obj.height * dpr
        }
        if (this.full) {
          obj.width = obj.width / this.scale
          obj.height = obj.height / this.scale
        }
      }
      obj.width = ~~obj.width
      obj.height = ~~obj.height
      return obj
    },
  },
  watch: {
    // 如果图片改变， 重新布局
    img() {
      // 当传入图片时, 读取图片信息同时展示
      this.checkedImg();
    },
    imgs(val) {
      if (val === "") {
        return;
      }
      this.reload();
    },
    cropW() {
      this.cropW = ~~this.cropW;
      this.showPreview();
    },
    cropH() {
      this.cropH = ~~this.cropH;
      this.showPreview();
    },
    cropOffsertX() {
      this.showPreview();
    },
    cropOffsertY() {
      this.showPreview();
    },
    scale(val, oldVal) {
			this.showPreview();
    },
    x() {
      this.showPreview();
    },
    y() {
      this.showPreview();
    },
    autoCrop (val) {
      if (val) {
        this.goAutoCrop()
      }
    },
    rotate() {
      this.showPreview();
      if (this.autoCrop) {
			  this.goAutoCrop(this.cropW, this.cropH)
      }
    }
  },
  methods: {
    // 校验图片
    checkedImg() {
      if (this.img === "") return;
			this.rotate = 0			
      this.loading = true;
      this.scale = 1;
      this.clearCrop();
      let canvas = document.createElement("canvas");
      let img = new Image();
      let rotate = 0
      img.onload = () => {
        if (this.img === '') {
          this.$emit("imgLoad", "error");
          return false
        }
        let width = img.width;
        let height = img.height;
        let ctx = canvas.getContext("2d");
        let dw = 0 
        let dh = 0
        let x = 0
        let y = 0
        ctx.save();
        exif.getData(img, () => {
          exif.getAllTags(img);
          this.orientation = exif.getTag(img, "Orientation");
          switch (this.orientation) {
            case 6:
              rotate = 1;
              break;
            case 8:
              rotate = -1;
              break;
            case 3:
              rotate = 3;
              break;
            default:
              rotate = 0;
          }
          let max = this.maxImgSize
          if (rotate === 0 && width < max & height < max ) {
            this.imgs = this.img;
            return;
          }
          if (width > max) {
            height = height / width * max
            width = max
          }
          if (height > max) {
            width = width / height * max
            height = max
          }
          switch (rotate) {
            case 0:
              canvas.width = width;
              canvas.height = height;
              dw = width
              dh = height
              break;
            case 1:
            case -3:
              // 旋转90度 或者-270度 宽度和高度对调
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(rotate * 90 * Math.PI / 180);
              dw = width
              dh = height
              y = -height
              break;
            case 2:
            case -2:
              canvas.width = width;
              canvas.height = height;
              ctx.rotate(rotate * 90 * Math.PI / 180);
              dw = width
              dh = height
              x = -width
              y = -height
              break;
            case 3:
            case -1:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(rotate * 90 * Math.PI / 180);
              dw = width
              dh = height
              x = -width
              y = 0
              break;
            default:
              canvas.width = width;
              canvas.height = height;
              dw = width
              dh = height
          }
          ctx.drawImage(img, x, y, dw, dh);
          ctx.restore();
          canvas.toBlob(
            blob => {
              let data = URL.createObjectURL(blob)
              this.imgs = data
            },
            "image/" + this.outputType,
            1
          );
        });
      };
      img.onerror = () => {
        this.$emit("imgLoad", "error");
      };
      img.crossOrigin = "*";
      img.src = this.img;
    },
    // 当按下鼠标键
    startMove(e) {
      e.preventDefault();
      // 如果move 为true 表示当前可以拖动
      if (this.move && !this.crop) {
        if (!this.canMove) {
          return false;
        }
        // 开始移动
        this.moveX = (e.clientX ? e.clientX : e.touches[0].clientX) - this.x;
        this.moveY = (e.clientY ? e.clientY : e.touches[0].clientY) - this.y;
        if (e.touches) {
          window.addEventListener("touchmove", this.moveImg);
          window.addEventListener("touchend", this.leaveImg);
          if (e.touches.length == 2) {
            // 记录手指刚刚放上去
            this.touches = e.touches;
            window.addEventListener("touchmove", this.touchScale);
            window.addEventListener("touchend", this.cancleTouchScale);
          }
        } else {
          window.addEventListener("mousemove", this.moveImg);
          window.addEventListener("mouseup", this.leaveImg);
        }
      } else {
        // 截图ing
        this.cropping = true;
        // 绑定截图事件
        window.addEventListener("mousemove", this.createCrop);
        window.addEventListener("mouseup", this.endCrop);
        window.addEventListener("touchmove", this.createCrop);
        window.addEventListener("touchend", this.endCrop);
        this.cropOffsertX = e.offsetX
          ? e.offsetX
          : e.touches[0].pageX - this.$refs.cropper.offsetLeft;
        this.cropOffsertY = e.offsetY
          ? e.offsetY
          : e.touches[0].pageY - this.$refs.cropper.offsetTop;
        this.cropX = e.clientX ? e.clientX : e.touches[0].clientX;
        this.cropY = e.clientY ? e.clientY : e.touches[0].clientY;
        this.cropChangeX = this.cropOffsertX;
        this.cropChangeY = this.cropOffsertY;
        this.cropW = 0;
        this.cropH = 0;
      }
    },
    // 移动端缩放
    touchScale(e) {
			e.preventDefault();
			let scale = this.scale
      // 记录变化量
      // 第一根手指
      var oldTouch1 = {
        x: this.touches[0].clientX,
        y: this.touches[0].clientY
      };
      var newTouch1 = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
      // 第二根手指
      var oldTouch2 = {
        x: this.touches[1].clientX,
        y: this.touches[1].clientY
      };
      var newTouch2 = {
        x: e.touches[1].clientX,
        y: e.touches[1].clientY
      };
      var oldL = Math.sqrt(
        Math.pow(oldTouch1.x - oldTouch2.x, 2) +
          Math.pow(oldTouch1.y - oldTouch2.y, 2)
      );
      var newL = Math.sqrt(
        Math.pow(newTouch1.x - newTouch2.x, 2) +
          Math.pow(newTouch1.y - newTouch2.y, 2)
      );
      var cha = ~~(newL - oldL);
      // 根据图片本身大小 决定每次改变大小的系数, 图片越大系数越小
      // 1px - 0.2
      var coe = 1;
      coe =
        coe / this.trueWidth > coe / this.trueHeight
          ? coe / this.trueHeight
          : coe / this.trueWidth;
      coe = coe > 0.1 ? 0.1 : coe;
      var num = coe * cha;
      if (!this.touchNow) {
        this.touchNow = true;
        if (cha > 0) {
          scale += Math.abs(num);
        } else if (cha < 0) {
          scale > Math.abs(num)
            ? (scale -= Math.abs(num))
            : scale;
        }
        this.touches = e.touches;
        setTimeout(() => {
          this.touchNow = false;
				}, 8);
				if (!this.checkoutImgAxis(this.x, this.y, scale)) {
					return false
				}
				this.scale = scale
      }
    },
    cancleTouchScale(e) {
      window.removeEventListener("touchmove", this.touchScale);
    },
    // 移动图片
    moveImg(e) {
      e.preventDefault();
      if (e.touches && e.touches.length === 2) {
        this.touches = e.touches;
        window.addEventListener("touchmove", this.touchScale);
        window.addEventListener("touchend", this.cancleTouchScale);
        window.removeEventListener("touchmove", this.moveImg);
        return false;
      }
			let nowX = e.clientX ? e.clientX : e.touches[0].clientX;
			let nowY = e.clientY ? e.clientY : e.touches[0].clientY;
			
			let changeX, changeY
			changeX = ~~(nowX - this.moveX);
			changeY = ~~(nowY - this.moveY);
			this.$nextTick(() => {
				if (this.centerBox) {
					let axis = this.getImgAxis(changeX, changeY, this.scale)
					let cropAxis = this.getCropAxis()
					let imgW = this.trueHeight * this.scale
					let imgH = this.trueWidth * this.scale
					let maxLeft, maxTop, maxRight, maxBottom
					switch (this.rotate) {
						case 1:
						case -1:
						case 3:
						case -3:
							maxLeft = this.cropOffsertX - this.trueWidth * (1 - this.scale) / 2 + (imgW - imgH) / 2
							maxTop = this.cropOffsertY - this.trueHeight * (1 - this.scale) / 2 + (imgH - imgW) / 2
							maxRight = maxLeft - imgW + this.cropW;
							maxBottom = maxTop - imgH + this.cropH;	
							break
						default:
							maxLeft = this.cropOffsertX - this.trueWidth * (1 - this.scale) / 2
							maxTop = this.cropOffsertY - this.trueHeight * (1 - this.scale) / 2
							maxRight = maxLeft - imgH + this.cropW
							maxBottom = maxTop - imgW + this.cropH
							break
					}
					// 图片左边 图片不能超过截图框
					if (axis.x1 >= cropAxis.x1) {
						changeX = maxLeft;
					}
					// 图片上边 图片不能超过截图框
					if (axis.y1 >= cropAxis.y1) {
						changeY = maxTop;
					}
					// 图片右边
					if (axis.x2 <= cropAxis.x2) {
						changeX = maxRight
					}
					// 图片下边
					if (axis.y2 <= cropAxis.y2) {
						changeY = maxBottom
					}
				}
				this.x = changeX
				this.y = changeY
			})
    },
    // 移动图片结束
    leaveImg(e) {
      window.removeEventListener("mousemove", this.moveImg);
      window.removeEventListener("touchmove", this.moveImg);
      window.removeEventListener("mouseup", this.leaveImg);
      window.removeEventListener("touchend", this.leaveImg);
    },
    // 缩放图片
    scaleImg() {
      this.support =
        "onwheel" in document.createElement("div")
          ? "wheel"
          : document.onmousewheel !== undefined
            ? "mousewheel"
            : "DOMMouseScroll";
      if (this.canScale) {
        window.addEventListener(this.support, this.changeSize);
      }
    },
    // 移出框
    cancleScale() {
      if (this.canScale) {
        window.removeEventListener(this.support, this.changeSize);
			}
    },
    // 改变大小函数
    changeSize(e) {
			e.preventDefault();
			let scale = this.scale
      var change = e.deltaY || e.wheelDelta;
      // 根据图片本身大小 决定每次改变大小的系数, 图片越大系数越小
      var isFirefox = navigator.userAgent.indexOf("Firefox");
      change = isFirefox > 0 ? change * 30 : change;
      // 1px - 0.2
      var coe = this.coe;
      coe =
        coe / this.trueWidth > coe / this.trueHeight
          ? coe / this.trueHeight
          : coe / this.trueWidth;
      var num = coe * change;
      num < 0
        ? (scale += Math.abs(num))
        : scale > Math.abs(num)
          ? (scale -= Math.abs(num))
          : scale;
      // 延迟0.1s 每次放大大或者缩小的范围
      let status = num < 0 ? "add" : "reduce";
      if (status !== this.coeStatus) {
        this.coeStatus = status;
        this.coe = 0.2;
      }
      if (!this.scaling) {
        this.scalingSet = setTimeout(() => {
          this.scaling = false;
          this.coe = this.coe += 0.01;
        }, 50);
      }
			this.scaling = true;
			if (!this.checkoutImgAxis(this.x, this.y, scale)) {
				return false
			}
			this.scale = scale
    },
    // 修改图片大小函数
    changeScale(num) {
			let scale = this.scale
      num = num || 1;
      var coe = 20;
      coe =
        coe / this.trueWidth > coe / this.trueHeight
          ? coe / this.trueHeight
          : coe / this.trueWidth;
      num = num * coe;
      num > 0
        ? (scale += Math.abs(num))
        : scale > Math.abs(num)
          ? (scale -= Math.abs(num))
					: scale;
			if (!this.checkoutImgAxis(this.x, this.y, scale)) {
				return false
			}
			this.scale = scale
    },
    // 创建截图框
    createCrop(e) {
      e.preventDefault();
      // 移动生成大小
      var nowX = e.clientX ? e.clientX : e.touches ? e.touches[0].clientX : 0;
      var nowY = e.clientY ? e.clientY : e.touches ? e.touches[0].clientY : 0;
      this.$nextTick(() => {
        var fw = ~~(nowX - this.cropX);
        var fh = ~~(nowY - this.cropY);
        if (fw > 0) {
          this.cropW =
            fw + this.cropChangeX > this.w ? this.w - this.cropChangeX : fw;
          	this.cropOffsertX = this.cropChangeX;
        } else {
          this.cropW =
            this.w - this.cropChangeX + Math.abs(fw) > this.w
						? this.cropChangeX
						: Math.abs(fw);
          this.cropOffsertX =
            this.cropChangeX + fw > 0 ? this.cropChangeX + fw : 0;
        }
        if (!this.fixed) {
          if (fh > 0) {
            this.cropH =
              fh + this.cropChangeY > this.h ? this.h - this.cropChangeY : fh;
            this.cropOffsertY = this.cropChangeY;
          } else {
            this.cropH =
              this.h - this.cropChangeY + Math.abs(fh) > this.h
                ? this.cropChangeY
                : Math.abs(fh);
            this.cropOffsertY =
              this.cropChangeY + fh > 0 ? this.cropChangeY + fh : 0;
          }
        } else {
          var fixedHeight = ~~(
            this.cropW /
            this.fixedNumber[0] *
            this.fixedNumber[1]
          );
          if (fixedHeight + this.cropOffsertY > this.h) {
            this.cropH = this.h - this.cropOffsertY;
            this.cropW = ~~(
              this.cropH /
              this.fixedNumber[1] *
              this.fixedNumber[0]
            );
            if (fw > 0) {
              this.cropOffsertX = this.cropChangeX;
            } else {
              this.cropOffsertX = this.cropChangeX - this.cropW;
            }
          } else {
            this.cropH = fixedHeight;
          }
          this.cropOffsertY = this.cropOffsertY;
        }
      });
    },
    // 改变截图框大小
    changeCropSize(e, w, h, typeW, typeH) {
      e.preventDefault();
      window.addEventListener("mousemove", this.changeCropNow);
      window.addEventListener("mouseup", this.changeCropEnd);
      window.addEventListener("touchmove", this.changeCropNow);
      window.addEventListener("touchend", this.changeCropEnd);
      this.canChangeX = w;
      this.canChangeY = h;
      this.changeCropTypeX = typeW;
      this.changeCropTypeY = typeH;
      this.cropX = e.clientX ? e.clientX : e.touches[0].clientX;
      this.cropY = e.clientY ? e.clientY : e.touches[0].clientY;
      this.cropOldW = this.cropW;
      this.cropOldH = this.cropH;
      this.cropChangeX = this.cropOffsertX;
      this.cropChangeY = this.cropOffsertY;
      if (this.fixed) {
        if (this.canChangeX && this.canChangeY) {
          this.canChangeY = 0;
        }
      }
    },
    // 正在改变
    changeCropNow(e) {
      e.preventDefault();
      var nowX = e.clientX ? e.clientX : e.touches ? e.touches[0].clientX : 0;
			var nowY = e.clientY ? e.clientY : e.touches ? e.touches[0].clientY : 0;
			// 容器的宽高
			let wrapperW = this.w
			let wrapperH = this.h
			// 不能超过的坐标轴
			let minX = 0
			let minY = 0
			if (this.centerBox) {
				let axis = this.getImgAxis()
				let imgW = axis.x2
				let imgH = axis.y2
				minX = axis.x1 > 0 ? axis.x1 : 0
				minY = axis.y1 > 0 ? axis.y1 : 0
				if (wrapperW > imgW) {
					wrapperW = imgW
				}
				if (wrapperH > imgH) {
					wrapperH = imgH
				}
			}
      this.$nextTick(() => {
        var fw = ~~(nowX - this.cropX);
        var fh = ~~(nowY - this.cropY);
        if (this.canChangeX) {
          if (this.changeCropTypeX === 1) {
            if (this.cropOldW - fw > 0) {
              this.cropW =
                wrapperW - this.cropChangeX - fw <= wrapperW - minX
                  ? this.cropOldW - fw
                  : this.cropOldW + this.cropChangeX - minX
              this.cropOffsertX =
                wrapperW  - this.cropChangeX - fw <= wrapperW - minX
                  ? this.cropChangeX + fw
                  : minX;
            } else {
              this.cropW =
                Math.abs(fw) + this.cropChangeX <= wrapperW 
                  ? Math.abs(fw) - this.cropOldW
                  : wrapperW  - this.cropOldW - this.cropChangeX;
              this.cropOffsertX = this.cropChangeX + this.cropOldW;
            }
          } else if (this.changeCropTypeX === 2) {
            if (this.cropOldW + fw > 0) {
              this.cropW =
                this.cropOldW + fw + this.cropOffsertX <= wrapperW
                  ? this.cropOldW + fw
                  : wrapperW  - this.cropOffsertX;
              this.cropOffsertX = this.cropChangeX;
            } else {
							// 右侧坐标抽 超过左侧
              this.cropW =
                wrapperW  - this.cropChangeX + Math.abs(fw + this.cropOldW) <=
                wrapperW - minX
                  ? Math.abs(fw + this.cropOldW)
                  : this.cropChangeX - minX;
              this.cropOffsertX =
                wrapperW - this.cropChangeX + Math.abs(fw + this.cropOldW) <=
                wrapperW - minX
                  ? this.cropChangeX - Math.abs(fw + this.cropOldW)
                  : minX;
            }
          }
        }
        if (this.canChangeY) {
          if (this.changeCropTypeY === 1) {
            if (this.cropOldH - fh > 0) {
              this.cropH =
                wrapperH - this.cropChangeY - fh <= wrapperH - minY
                  ? this.cropOldH - fh
                  : this.cropOldH + this.cropChangeY - minY;
              this.cropOffsertY =
                wrapperH - this.cropChangeY - fh <= wrapperH - minY
                  ? this.cropChangeY + fh
                  : minY;
            } else {
              this.cropH =
                Math.abs(fh) + this.cropChangeY <= wrapperH
                  ? Math.abs(fh) - this.cropOldH
                  : wrapperH - this.cropOldH - this.cropChangeY;
              this.cropOffsertY = this.cropChangeY + this.cropOldH;
            }
          } else if (this.changeCropTypeY === 2) {
            if (this.cropOldH + fh > 0) {
              this.cropH =
                this.cropOldH + fh + this.cropOffsertY <= wrapperH
                  ? this.cropOldH + fh
                  : wrapperH - this.cropOffsertY;
              this.cropOffsertY = this.cropChangeY;
            } else {
              this.cropH =
                wrapperH - this.cropChangeY + Math.abs(fh + this.cropOldH) <=
                wrapperH - minY
                  ? Math.abs(fh + this.cropOldH)
                  : this.cropChangeY - minY;
              this.cropOffsertY =
                wrapperH - this.cropChangeY + Math.abs(fh + this.cropOldH) <=
                wrapperH - minY
                  ? this.cropChangeY - Math.abs(fh + this.cropOldH)
                  : minY;
            }
          }
        }
        if (this.canChangeX && this.fixed) {
          var fixedHeight = ~~(
            this.cropW /
            this.fixedNumber[0] *
            this.fixedNumber[1]
          );
          if (fixedHeight + this.cropOffsertY > wrapperH) {
            this.cropH = wrapperH - this.cropOffsertY;
            this.cropW = ~~(
              this.cropH /
              this.fixedNumber[1] *
              this.fixedNumber[0]
            );
          } else {
            this.cropH = fixedHeight;
          }
        }
        if (this.canChangeY && this.fixed) {
          var fixedWidth = ~~(
            this.cropH /
            this.fixedNumber[1] *
            this.fixedNumber[0]
          );
          if (fixedWidth + this.cropOffsertX > wrapperW ) {
            this.cropW = wrapperW  - this.cropOffsertX;
            this.cropH = ~~(
              this.cropW /
              this.fixedNumber[0] *
              this.fixedNumber[1]
            );
          } else {
            this.cropW = fixedWidth;
          }
        }
      });
    },
    // 结束改变
    changeCropEnd(e) {
      window.removeEventListener("mousemove", this.changeCropNow);
      window.removeEventListener("mouseup", this.changeCropEnd);
      window.removeEventListener("touchmove", this.changeCropNow);
      window.removeEventListener("touchend", this.changeCropEnd);
    },
    // 创建完成
    endCrop() {
      if (this.cropW === 0 && this.cropH === 0) {
        this.cropping = false;
      }
      window.removeEventListener("mousemove", this.createCrop);
      window.removeEventListener("mouseup", this.endCrop);
      window.removeEventListener("touchmove", this.createCrop);
      window.removeEventListener("touchend", this.endCrop);
    },
    // 开始截图
    startCrop() {
      this.crop = true;
      // console.log('开始截图')
    },
    // 停止截图
    stopCrop() {
      this.crop = false;
      // console.log('停止截图')
    },
    // 清除截图
    clearCrop() {
      this.cropping = false;
      this.cropW = 0;
      this.cropH = 0;
      // console.log('清除截图')
    },
    // 截图移动
    cropMove(e) {
      e.preventDefault();
      if (!this.canMoveBox) {
        this.crop = false;
        this.startMove(e);
        return false;
			}
			if (e.touches && e.touches.length === 2) {
        this.crop = false;
				this.startMove(e);
				this.leaveCrop()
        return false;
			}
      window.addEventListener("mousemove", this.moveCrop);
      window.addEventListener("mouseup", this.leaveCrop);
      window.addEventListener("touchmove", this.moveCrop);
			window.addEventListener("touchend", this.leaveCrop);
			let x = (e.clientX ? e.clientX : e.touches[0].clientX)
			let y =  (e.clientY ? e.clientY : e.touches[0].clientY)
			let newX, newY
			newX = x - this.cropOffsertX;
			newY= y - this.cropOffsertY;
      this.cropX = newX
      this.cropY = newY
    },
    moveCrop(e, isMove) {
			let nowX = 0
			let nowY = 0
      if (e) {
				e.preventDefault();
				nowX = e.clientX ? e.clientX : e.touches[0].clientX;
				nowY = e.clientY ? e.clientY : e.touches[0].clientY;
			}
      this.$nextTick(() => {
				let cx, cy
        let fw = ~~(nowX - this.cropX);
				let fh = ~~(nowY - this.cropY);
				if (isMove) {
					fw = this.cropOffsertX
					fh = this.cropOffsertY
				}
				// 不能超过外层容器
        if (fw <= 1) {
          cx = 1;
        } else if (~~(fw + this.cropW) > this.w) {
          cx = this.w - this.cropW - 1;
        } else {
          cx = fw;
        }
        if (fh <= 1) {
          cy = 1;
        } else if (~~(fh + this.cropH) > this.h) {
          cy = this.h - this.cropH - 1;
        } else {
          cy = fh;
				}
				
				// 不能超过图片
				if (this.centerBox) {
					let axis = this.getImgAxis()
					// 横坐标判断
					if (cx < axis.x1) {
						cx = axis.x1
					}
					if (cx + this.cropW > axis.x2) {
          	cx = axis.x2 - this.cropW;
					}
					// 纵坐标纵轴
					if (cy < axis.y1) {
						cy = axis.y1
					}
					if (cy + this.cropH > axis.y2) {
          	cy = axis.y2 - this.cropH;
					}
				}
				this.cropOffsertX = cx
				this.cropOffsertY = cy
      });
		},
		
		// 算出不同场景下面 图片相对于外层容器的坐标轴
		getImgAxis (x, y, scale) {
			x = x || this.x
			y = y || this.y
			scale = scale || this.scale
			// 如果设置了截图框在图片内， 那么限制截图框不能超过图片的坐标
			// 图片的坐标 
			let obj = {
				x1: 0,
				x2: 0,
				y1: 0,
				y2: 0
			}
			let imgW = this.trueWidth * scale;
			let imgH = this.trueHeight * scale;
			switch (this.rotate) {
				case 0:
					obj.x1 = ~~((x + this.trueWidth * (1 - scale) / 2))
					obj.x2 = ~~(obj.x1 + this.trueWidth * scale)
					obj.y1 = ~~((y + this.trueHeight * (1 - scale) / 2))
					obj.y2 = ~~(obj.y1 + this.trueHeight * scale)
				break
				case 1:
				case -1:
				case 3:
				case -3:
					obj.x1 = ~~((x + this.trueWidth * (1 - scale) / 2)) + (imgW - imgH) / 2;
					obj.x2 = ~~(obj.x1 + this.trueHeight * scale)
					obj.y1 = ~~((y + this.trueHeight * (1 - scale) / 2)) + (imgH - imgW) / 2;
					obj.y2 = ~~(obj.y1 + this.trueWidth * scale)
				break
				default:
					obj.x1 = ~~((x + this.trueWidth * (1 - scale) / 2))
					obj.x2 = ~~(obj.x1 + this.trueWidth * scale)
					obj.y1 = ~~((y + this.trueHeight * (1 - scale) / 2))
					obj.y2 = ~~(obj.y1 + this.trueHeight * scale)
				break
			}
			return obj
		},
		// 获取截图框的坐标轴
		getCropAxis () {
			let obj = {
				x1: 0,
				x2: 0,
				y1: 0,
				y2: 0
			}
			obj.x1 = this.cropOffsertX
			obj.x2 = obj.x1 + this.cropW
			obj.y1 = this.cropOffsertY
			obj.y2 = obj.y1 + this.cropH
			return obj 
		},
    leaveCrop(e) {
      window.removeEventListener("mousemove", this.moveCrop);
      window.removeEventListener("mouseup", this.leaveCrop);
      window.removeEventListener("touchmove", this.moveCrop);
      window.removeEventListener("touchend", this.leaveCrop);
    },
    // 获取转换成base64 的图片信息
    getCropData(cb) {
      let canvas = document.createElement("canvas");
      let img = new Image();
      let rotate = this.rotate;
      let trueWidth = this.trueWidth;
      let trueHeight = this.trueHeight;
      let cropOffsertX = this.cropOffsertX;
      let cropOffsertY = this.cropOffsertY;
      img.onload = () => {
        if (~~this.cropW !== 0) {
					let ctx = canvas.getContext("2d");
					let dpr = 1
					if (this.high & ! this.full) {
						dpr =  window.devicePixelRatio
					}
          let width = this.cropW * dpr;
          let height = this.cropH * dpr;
          let imgW = trueWidth * this.scale * dpr;
					let imgH = trueHeight * this.scale * dpr;
          // 图片x轴偏移
          let dx =
            (this.x - cropOffsertX + this.trueWidth * (1 - this.scale) / 2) * dpr;
          // 图片y轴偏移
          let dy =
            (this.y - cropOffsertY + this.trueHeight * (1 - this.scale) / 2) * dpr;
          // console.log(dx, dy)
          //保存状态
          canvas.width = width;
          canvas.height = height;
          ctx.save();
          switch (rotate) {
            case 0:
              if (!this.full) {
                ctx.drawImage(img, dx, dy, imgW, imgH);
              } else {
                // 输出原图比例截图
                canvas.width = width / this.scale;
                canvas.height = height / this.scale;
                ctx.drawImage(
                  img,
                  dx / this.scale,
                  dy / this.scale,
                  imgW / this.scale,
                  imgH / this.scale
                );
              }
              break;
            case 1:
            case -3:
              if (!this.full) {
                // 换算图片旋转后的坐标弥补
                dx = dx + (imgW - imgH) / 2;
                dy = dy + (imgH - imgW) / 2;
                ctx.rotate(rotate * 90 * Math.PI / 180);
                ctx.drawImage(img, dy, -dx - imgH, imgW, imgH);
              } else {
                canvas.width = width / this.scale;
                canvas.height = height / this.scale;
                // 换算图片旋转后的坐标弥补
                dx =
                  dx / this.scale + (imgW / this.scale - imgH / this.scale) / 2;
                dy =
                  dy / this.scale + (imgH / this.scale - imgW / this.scale) / 2;
                ctx.rotate(rotate * 90 * Math.PI / 180);
                ctx.drawImage(
                  img,
                  dy,
                  -dx - imgH / this.scale,
                  imgW / this.scale,
                  imgH / this.scale
                );
              }
              break;
            case 2:
            case -2:
              if (!this.full) {
                ctx.rotate(rotate * 90 * Math.PI / 180);
                ctx.drawImage(img, -dx - imgW, -dy - imgH, imgW, imgH);
              } else {
                canvas.width = width / this.scale;
                canvas.height = height / this.scale;
                ctx.rotate(rotate * 90 * Math.PI / 180);
                dx = dx / this.scale;
                dy = dy / this.scale;
                ctx.drawImage(
                  img,
                  -dx - imgW / this.scale,
                  -dy - imgH / this.scale,
                  imgW / this.scale,
                  imgH / this.scale
                );
              }
              break;
            case 3:
            case -1:
              if (!this.full) {
                // 换算图片旋转后的坐标弥补
                dx = dx + (imgW - imgH) / 2;
                dy = dy + (imgH - imgW) / 2;
                ctx.rotate(rotate * 90 * Math.PI / 180);
                ctx.drawImage(img, -dy - imgW, dx, imgW, imgH);
              } else {
                canvas.width = width / this.scale;
                canvas.height = height / this.scale;
                // 换算图片旋转后的坐标弥补
                dx =
                  dx / this.scale + (imgW / this.scale - imgH / this.scale) / 2;
                dy =
                  dy / this.scale + (imgH / this.scale - imgW / this.scale) / 2;
                ctx.rotate(rotate * 90 * Math.PI / 180);
                ctx.drawImage(
                  img,
                  -dy - imgW / this.scale,
                  dx,
                  imgW / this.scale,
                  imgH / this.scale
                );
              }
              break;
            default:
              if (!this.full) {
                ctx.drawImage(img, dx, dy, imgW, imgH);
              } else {
                // 输出原图比例截图
                canvas.width = width / this.scale;
                canvas.height = height / this.scale;
                ctx.drawImage(
                  img,
                  dx / this.scale,
                  dy / this.scale,
                  imgW / this.scale,
                  imgH / this.scale
                );
              }
          }
          ctx.restore();
        } else {
          let width = trueWidth * this.scale;
          let height = trueHeight * this.scale;
          let ctx = canvas.getContext("2d");
          ctx.save();
          switch (rotate) {
            case 0:
              canvas.width = width;
              canvas.height = height;
              ctx.drawImage(img, 0, 0, width, height);
              break;
            case 1:
            case -3:
              // 旋转90度 或者-270度 宽度和高度对调
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(rotate * 90 * Math.PI / 180);
              ctx.drawImage(img, 0, -height, width, height);
              break;
            case 2:
            case -2:
              canvas.width = width;
              canvas.height = height;
              ctx.rotate(rotate * 90 * Math.PI / 180);
              ctx.drawImage(img, -width, -height, width, height);
              break;
            case 3:
            case -1:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(rotate * 90 * Math.PI / 180);
              ctx.drawImage(img, -width, 0, width, height);
              break;
            default:
              canvas.width = width;
              canvas.height = height;
              ctx.drawImage(img, 0, 0, width, height);
          }
          ctx.restore();
        }
        let data = canvas.toDataURL(
          "image/" + this.outputType,
          this.outputSize
        );
        cb(data);
      };
      // 判断图片是否是base64
      var s = this.img.substr(0, 4);
      if (s !== "data") {
        img.crossOrigin = "anonymous";
      }
      img.src = this.imgs;
    },
    //转化base64 为blob对象
    getCropBlob(cb) {
      this.getCropData(data => {
        var arr = data.split(",");
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        cb(
          new Blob([u8arr], {
            type: mime
          })
        );
      });
    },
    // 自动预览函数
    showPreview() {
      var obj = {};
      obj.div = {
        width: this.cropW + "px",
        height: this.cropH + "px"
      };
      obj.img = {
        width: this.trueWidth + "px",
        height: this.trueHeight + "px",
        transform:
          "scale(" +
          this.scale +
          "," +
          this.scale +
          ") " +
          "translate3d(" +
          (this.x - this.cropOffsertX) / this.scale +
          "px," +
          (this.y - this.cropOffsertY) / this.scale +
          "px," +
          "0)" +
          "rotateZ(" +
          this.rotate * 90 +
          "deg)"
      };
      obj.w = this.cropW;
      obj.h = this.cropH;
      obj.url = this.imgs;
      this.$emit("realTime", obj);
    },
    // reload 图片布局函数
    reload() {
      let img = new Image();
      img.onload = () => {
        // 读取图片的信息原始信息， 解析是否需要旋转
        // 读取图片的旋转信息
        // 得到外层容器的宽度高度
        this.w = ~~window
          .getComputedStyle(this.$refs.cropper)
          .width.replace("px", "");
        this.h = ~~window
          .getComputedStyle(this.$refs.cropper)
          .height.replace("px", "");
        // 存入图片真实高度
        this.trueWidth = img.width;
        this.trueHeight = img.height;
        // 判断是否需要压缩大图
        if (!this.original) {
          if (this.trueWidth > this.w) {
            // 如果图片宽度大于容器宽度
            this.scale = this.w / this.trueWidth;
          }
          if (this.trueHeight * this.scale > this.h) {
            this.scale = this.h / this.trueHeight;
          }
        } else {
          this.scale = 1;
        }
        this.$nextTick(() => {
          this.x =
            -(this.trueWidth - this.trueWidth * this.scale) / 2 +
            (this.w - this.trueWidth * this.scale) / 2;
          this.y =
            -(this.trueHeight - this.trueHeight * this.scale) / 2 +
            (this.h - this.trueHeight * this.scale) / 2;
          this.loading = false;
          // // 获取是否开启了自动截图
          if (this.autoCrop) {
            this.goAutoCrop();
          }
          // // 图片加载成功的回调
          this.$emit("imgLoad", "success");
        });
      };
      img.onerror = () => {
        this.$emit("imgLoad", "error");
      };
      img.src = this.imgs;
    },
    // 自动截图函数
    goAutoCrop(cw, ch) {
			this.clearCrop()
			this.cropping = true;
			let maxWidth = this.w
			let maxHeight = this.h
			if (this.centerBox) {
				let imgW = this.trueWidth * this.scale 
				let imgH = this.trueHeight * this.scale
				maxWidth = imgW < maxWidth ? imgW : maxWidth
				maxHeight = imgH < maxHeight ? imgH : maxHeight
			}
      // 截图框默认大小
      // 如果为0 那么计算容器大小 默认为80%
      var w = cw ? cw : this.autoCropWidth;
      var h = ch ? ch : this.autoCropHeight;
      if (w === 0 || h === 0) {
        w = maxWidth * 0.8;
        h = maxHeight * 0.8;
      }
      w = w > maxWidth ? maxWidth : w;
      h = h > maxHeight ? maxHeight : h;
      if (this.fixed) {
        h = w / this.fixedNumber[0] * this.fixedNumber[1];
      }
      // 如果比例之后 高度大于h
      if (h > this.h) {
        h = this.h;
        w = h / this.fixedNumber[1] * this.fixedNumber[0];
			}
      this.changeCrop(w, h);
    },
    // 手动改变截图框大小函数
    changeCrop(w, h) {
      // 判断是否大于容器
      this.cropW = w;
      this.cropH = h;
      // 居中走一走
      this.cropOffsertX = (this.w - w) / 2;
			this.cropOffsertY = (this.h - h) / 2;
			if (this.centerBox) {
				this.$nextTick(() => {
					this.moveCrop(null, true)
				})
			}
    },
    // 重置函数， 恢复组件置初始状态
    refresh() {
			// console.log('refresh')
			let img = this.img
      this.imgs = "";
      this.scale = 1;
      this.crop = false;
      this.rotate = 0;
      this.w = 0;
      this.h = 0;
      this.trueWidth = 0;
      this.trueHeight = 0;
			this.clearCrop();
			this.$nextTick(() => {
				this.imgs = img
			})
    },
    // 向左边旋转
    rotateLeft() {
      this.rotate = this.rotate <= -3 ? 0 : this.rotate - 1;
    },
    // 向右边旋转
    rotateRight() {
      this.rotate = this.rotate >= 3 ? 0 : this.rotate + 1;
    },
    // 清除旋转
    rotateClear() {
      this.rotate = 0;
		},
		
		// 图片坐标点校验
		checkoutImgAxis (x, y, scale) {
			x = x || this.x
			y = y || this.y
			scale = scale || this.scale
			let canGo = true
			// 开始校验 如果说缩放之后的坐标在截图框外 则阻止缩放
			if (this.centerBox) {
				let axis = this.getImgAxis(x, y, scale)
				let cropAxis = this.getCropAxis()
				// 左边的横坐标 图片不能超过截图框
				if (axis.x1 >= cropAxis.x1) {
					canGo = false
				}
				// 右边横坐标
				if (axis.x2 <= cropAxis.x2) {
					canGo = false
				}
				// 纵坐标上面
				if (axis.y1 >= cropAxis.y1) {
					canGo = false
				}
				// 纵坐标下面
				if (axis.y2 <= cropAxis.y2) {
					canGo = false
				}
				
			}
			return canGo
		},
  },
  mounted() {
    let that = this;
    this.showPreview();
    this.checkedImg();
    var u = navigator.userAgent;
    this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    // 兼容blob
    if (!HTMLCanvasElement.prototype.toBlob) {
      Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
        value: function(callback, type, quality) {
          var binStr = atob(this.toDataURL(type, quality).split(",")[1]),
            len = binStr.length,
            arr = new Uint8Array(len);
          for (var i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i);
          }
          callback(new Blob([arr], { type: that.type || "image/png" }));
        }
      });
    }
  },
  destroyed() {
    window.removeEventListener("mousemove", this.moveCrop);
    window.removeEventListener("mouseup", this.leaveCrop);
    window.removeEventListener("touchmove", this.moveCrop);
    window.removeEventListener("touchend", this.leaveCrop);
  }
};
</script>

<style scoped>
.vue-cropper {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  direction: ltr;
  touch-action: none;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
}
.cropper-box,
.cropper-box-canvas,
.cropper-drag-box,
.cropper-crop-box,
.cropper-face {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  user-select: none;
}
.cropper-box-canvas img {
  position: relative;
	text-align: left;
  user-select: none;
  transform: none;
  max-width: none;
  max-height: none;
}
.cropper-box {
  overflow: hidden;
}
.cropper-move {
  cursor: move;
}
.cropper-crop {
  cursor: crosshair;
}
.cropper-modal {
  background: rgba(0, 0, 0, 0.5);
}
.cropper-crop-box {
  /*border: 2px solid #39f;*/
}
.cropper-view-box {
  display: block;
  overflow: hidden;
  width: 100%;
  height: 100%;
  outline: 1px solid #39f;
  outline-color: rgba(51, 153, 255, 0.75);
  user-select: none;
}
.cropper-view-box img {
  user-select: none;
	text-align: left;
  max-width: none;
  max-height: none;
}
.cropper-face {
  top: 0;
  left: 0;
  background-color: #fff;
  opacity: 0.1;
}
.crop-info {
  position: absolute;
  left: 0px;
  min-width: 65px;
  text-align: center;
  color: white;
  line-height: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  font-size: 12px;
}
.crop-line {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0.1;
}
.line-w {
  top: -3px;
  left: 0;
  height: 5px;
  cursor: n-resize;
}
.line-a {
  top: 0;
  left: -3px;
  width: 5px;
  cursor: w-resize;
}
.line-s {
  bottom: -3px;
  left: 0;
  height: 5px;
  cursor: s-resize;
}
.line-d {
  top: 0;
  right: -3px;
  width: 5px;
  cursor: e-resize;
}
.crop-point {
  position: absolute;
  width: 8px;
  height: 8px;
  opacity: 0.75;
  background-color: #39f;
  border-radius: 100%;
}
.point1 {
  top: -4px;
  left: -4px;
  cursor: nw-resize;
}
.point2 {
  top: -5px;
  left: 50%;
  margin-left: -3px;
  cursor: n-resize;
}
.point3 {
  top: -4px;
  right: -4px;
  cursor: ne-resize;
}
.point4 {
  top: 50%;
  left: -4px;
  margin-top: -3px;
  cursor: w-resize;
}
.point5 {
  top: 50%;
  right: -4px;
  margin-top: -3px;
  cursor: w-resize;
}
.point6 {
  bottom: -5px;
  left: -4px;
  cursor: sw-resize;
}
.point7 {
  bottom: -5px;
  left: 50%;
  margin-left: -3px;
  cursor: s-resize;
}
.point8 {
  bottom: -5px;
  right: -4px;
  cursor: nw-resize;
}
@media screen and (max-width: 500px) {
  .crop-point {
    position: absolute;
    width: 20px;
    height: 20px;
    opacity: 0.45;
    background-color: #39f;
    border-radius: 100%;
  }
  .point1 {
    top: -10px;
    left: -10px;
  }
  .point2,
  .point4,
  .point5,
  .point7 {
    display: none;
  }
  .point3 {
    top: -10px;
    right: -10px;
  }
  .point4 {
    top: 0;
    left: 0;
  }
  .point6 {
    bottom: -10px;
    left: -10px;
  }
  .point8 {
    bottom: -10px;
    right: -10px;
  }
}
</style>