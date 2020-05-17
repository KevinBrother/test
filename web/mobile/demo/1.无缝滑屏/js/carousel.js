!(function (w) {
    /**
     * @description: 图片轮播图
     * 
     * 
     * // html 
     *  <div class="carousel-wrap" needCarousel needAuto>
            <div class="point-wrap">
            </div>
        </div>

        // css
        <link rel="stylesheet" href="./js/carousel.css">
     * 
     * @param {type} imgArr 图片数组
     * @param {type} needCarousel html指令 是否需要无缝轮播
     * @param {type} needAuto html指令 是否需要自动轮播
     */

    function carousel (imgArr) {
        let pointeLength = imgArr.length;
        let autoIndex = 0;
        let carouselWrap = document.querySelector('.carousel-wrap');

        imgArr = imgArr.concat(imgArr);
        carouselLayout(imgArr);

        /** 布局
         * @description: 根据图片动态布局，包括ul宽度的百分比，每个 li 的宽度百分比
         * @param {type} ： imgArr  图片数组
         */
        function carouselLayout (imgArr) {

            if (carouselWrap) {

                needCarousel = carouselWrap.getAttribute('needCarousel');
                needCarousel = needCarousel == null ? false : true;
                if (needCarousel) {
                    // imgArr = imgArr.concat(imgArr);
                }
                console.log('----------------imgarr-----------', imgArr.length);

                let ulNode = document.createElement('ul');
                // ulNode.setAttribute('class', 'list');
                ulNode.classList.add('list');

                let styleNode = document.createElement('style');
                styleNode.innerHTML = `.carousel-wrap > ul.list {width: ${imgArr.length * 100}%;}
                               .carousel-wrap > ul.list li {width: ${1 / imgArr.length * 100}%;}`

                for (let img of imgArr) {
                    ulNode.innerHTML += `<li>
                                <img src="${img}" alt="">
                            </li>`
                }
                carouselWrap.appendChild(ulNode);
                document.head.appendChild(styleNode);

                let imgNode = document.querySelector(".carousel-wrap ul.list li img");
                setTimeout(() => {
                    carouselWrap.style.height = imgNode.offsetHeight + 'px';
                }, 100);

                let pointWrap = document.querySelector('.carousel-wrap > .point-wrap');
                if (pointWrap) {
                    let pUlNode = document.createElement('ul');
                    for (let i = 0; i < pointeLength; i++) {
                        pUlNode.innerHTML += `<li> </li>`
                    }
                    pUlNode.firstChild.classList.add("active");
                    pointWrap.appendChild(pUlNode);
                }

                carouselAction(imgArr, needCarousel);
            }

        }

        /** 滑屏
         * @description: 手指滑动屏幕，图片元素也跟着滑动
         *              1.拿到元素一开始的位置
         *              2.拿到手指一开始的位置
         *              3.拿到手指移动的距离
         *              4.元素滑动手指一动的距离
         */
        function carouselAction (imgArr, needCarousel) {
            let startX = 0; //手指一开始的位置
            let elementX = 0; //元素一开始的位置
            let movedX = 0; // 手指移动的距离
            // let translateX = 0; // 元素偏移量，替代offsetLeft
            let carouselWrap = document.querySelector('.carousel-wrap');
            let ulNode = document.querySelector('.carousel-wrap ul.list');

            carouselWrap.addEventListener('touchstart', function (ev) {
                ev = ev || event;
                let touchC = ev.changedTouches[0]; // changedTouches 获取的是多个手指，只取第一个手指
                ulNode.style.transition = 'none';


                if (needCarousel) {
                    // 无缝
                    /* 
                        点击第一组的第一张瞬间跳到第二组的第一张
                        点击第二组的最后一张瞬间跳到第一组的最后一张
                    */
                    // index 代表ul的位置
                    let index = transformCss(ulNode, 'translateX') / document.documentElement
                        .clientWidth;
                    // console.log('---------------index------------', index);
                    if (-index === 0) {
                        index = -pointeLength;
                        // console.log('---------------index == 0 ------------', index);
                    } else if (-index == (imgArr.length - 1)) {
                        index = -(pointeLength - 1)
                    }
                    transformCss(ulNode, 'translateX', index * (document
                        .documentElement.clientWidth))
                }

                startX = touchC.clientX;
                elementX = transformCss(ulNode, 'translateX');
                // console.log('-----start----', transformCss(ulNode, 'translateX'));

                // 清除定时器
                clearInterval(timer);
            })
            carouselWrap.addEventListener('touchmove', function (ev) {
                ev = ev || event;
                let touchC = ev.changedTouches[0];
                let nowX = touchC.clientX;
                // console.log(nowX);
                movedX = nowX - startX;

                // 元素移动手指移动的距离
                // ulNode.style.left = elementX + movedX + 'px';
                ulNode.style.transform = transformCss(ulNode, 'translateX', elementX + movedX)
                // console.log('-----move----', transformCss(ulNode, 'translateX'));
            })
            carouselWrap.addEventListener('touchend', function (ev) {
                ev = ev || event;

                // let index = ulNode.offsetLeft / document.documentElement.clientWidth;
                autoIndex = transformCss(ulNode, 'translateX') / document.documentElement.clientWidth;
                autoIndex = Math.round(autoIndex);
                // console.log('round', autoIndex);
                // console.log('end imgArr.length', imgArr.length);

                if (autoIndex > 0) { // 右滑加载最后一屏
                    autoIndex = 0;
                } else if (autoIndex < 1 - imgArr.length) { // 左滑最后一屏加载第一屏
                    autoIndex = 1 - imgArr.length;
                }

                point(autoIndex);
                auto(autoIndex);
                ulNode.style.transition = '.3s transform';
                // ulNode.style.left = autoIndex * (document.documentElement.clientWidth) + 'px';
                ulNode.style.transform = transformCss(ulNode, 'translateX', autoIndex * (document
                    .documentElement.clientWidth))
                // ulNode.style.transform = 'translateX(' + translateX + 'px)';
                // console.log('-----end----', transformCss(ulNode, 'translateX'));

            })
        }




        let timer = 0; // 自动轮播

        let needAuto = carouselWrap.getAttribute('needAuto');

        needAuto = needAuto == null ? false : true;
        if (needAuto) {
            // imgArr = imgArr.concat(imgArr);
        }

        auto(autoIndex)
        /** 自动轮播
         * @description: 设置定时器自动轮播 
         * @param {type} 
         */
        function auto (index) {
            clearInterval(timer)
            timer = setInterval(function () {
                let ulNode = document.querySelector('.carousel-wrap ul.list');

                if (index == 1 - imgArr.length) {
                    ulNode.style.transition = 'none';
                    index = 1 - imgArr.length / 2;
                    transformCss(ulNode, 'translateX', index * document.documentElement.clientWidth);
                }
                setTimeout(() => {
                    index--;
                    // console.log('---------autoFlag index------', index);
                    point(index);
                    ulNode.style.transition = '1s transform';
                    transformCss(ulNode, 'translateX', index * document.documentElement
                        .clientWidth);
                }, 50);
            }, 3000) // 轮播一张需要的时间
        }

        function point (index) {
            let pointWrap = document.querySelector('.carousel-wrap > .point-wrap');
            if (pointWrap) {
                let pUlNode = pointWrap.children[0];
                // console.log('-------pointWrap--------', pointWrap);
                for (let li of [].slice.call(pUlNode.children)) {
                    // console.log(li);
                    li.classList.remove('active');
                }
                pUlNode.children[Math.abs(index % pointeLength)].classList.add('active');
            }
        }
    };

    w.carousel = carousel;
})(window)