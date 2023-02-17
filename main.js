
//1. rendder song -> ok
//2. scroll top -> ok
//3. play/ plause/ seek -> ok
//4. CD rotate -> ok
//5. Next/ prev -> ok
//6. Radom -> ok
//7. next/ repeat when end -> ok
//8. active song ->ok
//9. scroll active song into view ->
//10. play song when click -> ok
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playList = $('.playlist');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const h2 = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const player = $('.player');
const progress = $('#progress');
const next = $('.btn-next');
const prev = $('.btn-prev');
const random = $('.btn-random');
const repeat = $('.btn-repeat');



const app = {
  currentIndex: 0,
  isRandom: false,
  isRepeat: false,

  songs: [
    {
      name: "Huơng",
      singer: "Văn Mai Hương",
      path: "./music/Huong-VanMaiHuongNegav-6927340.mp3",
      image: "https://cdn.24h.com.vn/upload/4-2021/images/2021-10-25/Van-Mai-Huong-giam-can-van-giu-duoc-vong-1-248457741_563548201540098_6742713544667143635_n-1635130455-307-width1080height1349.jpg"
    },
    {
      name: "Hà Nội mùa vắng những cơn mưa",
      singer: "Lệ Quyên",
      path: "./music/HaNoiMuaVangNhungConMua-LeQuyen_4dajf.mp3",
      image: "https://golives3.s3.amazonaws.com/2022/09/7845_1e4ab33cf74ef7a3c628c21aa2a1038f.jpg"
    },
    {
      name: "Biển nhớ",
      singer: "Lệ Quyên",
      path: "./music/BienNho-LeQuyen-5410854.mp3",
      image:
        "https://afamilycdn.com/150157425591193600/2021/4/23/batchkhoa-1036-1619195524981402508830.jpg"
    },
    {
      name: "Diễm xưa",
      singer: "Hồng Nhung",
      path:
        "./music/DiemXua-HongNhung-370635.mp3",
      image: "https://vtv1.mediacdn.vn/zoom/550_339/2022/8/16/7489598910157328044157819801495636791787520nxyzv-1660658364739505056271.jpeg"
    },
    {
      name: "Gõ cửa trái tim",
      singer: "Quỳnh Trang",
      path: "./music/GoCuaTraiTim-QuynhTrang-4706741.mp3",
      image:
        "https://yt3.googleusercontent.com/ytc/AL5GRJU6MdQE5xBmtr0UqG3wW9ZIEAiK-MDRprv3XKrzGQ=s900-c-k-c0x00ffffff-no-rj"
    },
    {
      name: "Một cõi đi về",
      singer: "Hồng Nhung",
      path: "./music/MotCoiDiVe-HongNhung_kr.mp3",
      image:
        "https://photo-cms-giaoduc.epicdn.me/w700/Uploaded/2023/bgtsgu/2012_10_07/19.jpeg"
    },
    {
      name: "Vùng lá me bay",
      singer: "Hà Vân ",
      path:
        "./music/VungLaMeBay-HaVan-4453327.mp3",
      image:
        "https://vcdn1-giaitri.vnecdn.net/2023/01/03/Ha-Van-Qua-xuan-cho-me-16-JPG-3264-1672715521.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=4W9xDQ9L4wb3cH2cgslkNA"
    },
    {
      name: "See tình",
      singer: "Hoàng Thùy Linh",
      path: "./music/SeeTinh-HoangThuyLinh-7702265.mp3",
      image:
        "https://vcdn1-giaitri.vnecdn.net/2022/08/11/thuy-linh-4-9531-1660206091.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=oZryE9xdDVx_va1smR87FQ"
    }
  ],

  render: function() {
    const htmls = this.songs.map((song, index) => {
      return  `
              <div class="song ${this.currentIndex == index ?'active':''}" data-index="${index}" >
                  <div class="thumb"
                      style="background-image: url('${song.image}')">
                  </div>
                  <div class="body">
                      <h3 class="title">${song.name}</h3>
                      <p class="author">${song.singer}</p>
                  </div>
                  <div class="option">
                      <i class="fas fa-ellipsis-h"></i>
                  </div>
              </div>
              `
    })
      playList.innerHTML = htmls.join('');
  },

  handleEvents: function() {
    const cdWidth = cd.offsetWidth;
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity
    })
    cdThumbAnimate.pause();


    document.onscroll = function() {
      const newCdWidth = cdWidth - window.scrollY;
      cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
      cd.style.opacity = newCdWidth/cdWidth;

    }


    playBtn.onclick = function() {
      if(audio.paused){
      audio.play();
      player.classList.add('playing');
      cdThumbAnimate.play();
    }
    else {
      audio.pause();
      player.classList.remove('playing');
      cdThumbAnimate.pause();
      }
    }

    audio.ontimeupdate = function() {
      if(audio.duration){
      const progressPercent = audio.currentTime/audio.duration*100;
      progress.value = progressPercent;
    }
    }

    progress.onclick = function() {
      audio.currentTime = progress.value/100*audio.duration;
    }

    next.onclick = function() {
      if(app.isRandom){
        app.playRandom()
        playBtn.onclick();
      }else{
            if(app.currentIndex >= app.songs.length-1) {
              app.currentIndex = 0;
            } else {
            app.currentIndex++;
            }
            app.loadSong();
            playBtn.onclick();
    }
    app.render();
    app.scrollIntoView();
    }

    prev.onclick = function() {
      if(app.isRandom){
        app.playRandom()
        playBtn.onclick();
      } else{
      if(app.currentIndex == 0) {
        app.currentIndex = app.songs.length-1;
      } else {
      app.currentIndex--;
      }
      app.loadSong();
      playBtn.onclick();
    }
    app.render();
    app.scrollIntoView();


  }

    random.onclick = function() {
      app.isRandom = !app.isRandom;
      random.classList.toggle('active');
    }

    audio.onended = function(){
      console.log(123);
      if(app.isRepeat){
        audio.play();
      }else{
      next.onclick();
    }
  }

    repeat.onclick = function() {
      app.isRepeat = !app.isRepeat;
      repeat.classList.toggle('active');
    }

    playList.onclick = function(e) {
      const songNode = e.target.closest('.song:not(.active)');
      if(songNode) {
          app.currentIndex = songNode.dataset.index;
          app.loadSong();
          app.render();
          playBtn.onclick();
      }
    }


  },

  playRandom:  function() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length)
    } while(newIndex == this.currentIndex);

    this.currentIndex = newIndex;
    this.loadSong();
  },

  loadSong: function() {
    if(this.songs.length === 0 ) {
      return
    } 
    const song = this.songs[this.currentIndex];
    h2.innerText = song.name;
    cdThumb.style.backgroundImage = `url(${song.image})`;
    audio.setAttribute('src',song.path);
  },
  scrollIntoView: function() {
    setTimeout(() => {
      $('.song.active').scrollIntoView({behavior: "smooth", block: "end"});
    },200)
  },


  start: function() {
    this.loadSong();

    this.render();

    this.handleEvents();

  }
  
};



app.start();

