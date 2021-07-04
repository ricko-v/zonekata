var data_book;
//localStorage.clear();

if (!localStorage.bookmark) {
   var datas = [{ quot: "ha" }, { quot: "ok" }];
   localStorage["bookmark"] = JSON.stringify(datas);
   data_book = JSON.parse(localStorage["bookmark"]);
}

//alert(data_book);

topbar.config({
   autoRun: true,
   barThickness: 5,
   barColors: {
      '0': 'white',
      '.3': 'silver',
      '1.0': 'grey'
   },
   shadowBlur: 5,
   shadowColor: 'rgba(0, 0, 0, .5)',
   className: 'topbar',
})

const cari = {
   template: `
<section>
<div class="container-fluid">
  <div class="row">
    <nav style="z-index:5;position:fixed;top:0;background:white;border-bottom:1px solid silver;" class="navbar">
    <div class="col s12 m3 l3"></div>
    <div class="col s12 m6 l6">
      <ul class="navbar-nav nav-justified">
         <li class="nav-item col s12">
         <li class="nav-item col s9">
            <input id="q" class="cari" placeholder="Masukan keyword / Nama tokoh">
         </li>
      <li class="nav-item col s3" v-if="!disabled">
	     <div v-on:click="cari" to="cari" class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" fill="black" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </div>
      </li>
      <li class="nav-item col s3" v-if="disabled">
        <div v-on:click="reset" class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" fill="black" class="bi bi-x-lg" viewBox="0 0 16 16">
	         <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
          </svg>
        </div>
      </li>
      </ul>
    </div>
    </nav>
   
  </div>
</div>

<div style="margin-top:100px">
   <div v-for="h in tam" v-if="tam.length > 0" style="margin-bottom: -20px;" class="container">
      <div class="row">
      <div class="col s12 m3 l3"></div>
      <div class="col s12 m6 l6">
         <div class="card horizontal z-depth-5">
            <div class="card-stacked">
               <div class="card-content">
                  <div class="head-card">
                     <img src="../img/logo.png">
                     <div class="col s10">
			<b>{{ h.nama.replace(/[_]/g," ") }}</b>
                        <br>
                        <small>{{ h.ket }}</small>
                     </div>
		     <div style="display:flex" class="col s2">
                     <div v-show="h.bookmark" v-bind:id="h.quot">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" fill="currentColor" class="bi bi-bookmark-check" viewBox="0 0 16 16">
                           <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                           <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                        </svg>
                     </div>
		     <div v-show="!h.bookmark" v-bind:kata="h.quot" v-bind:ket="h.ket" v-bind:nama="h.nama" v-on:click="addbook" v-bind:class="'book_'+h.quot">
                        <svg v-bind:class="'bok_'+h.quot" v-bind:nama="h.nama" v-bind:kata="h.quot" v-bind:ket="h.ket" xmlns="http://www.w3.org/2000/svg" width="1.6em" fill="currentColor" class="bi bi-bookmark-plus" viewBox="0 0 16 16">
			  <path v-bind:class="'bok_'+h.quot" v-bind:kata="h.quot" v-bind:ket="h.ket" v-bind:nama="h.nama" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
			  <path v-bind:class="'bok_'+h.quot" v-bind:kata="h.quot" v-bind:ket="h.ket" v-bind:nama="h.nama" d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"/>
                        </svg>
                     </div>
	             </div>
                  </div>
                  <blockquote id="hakata">
		    {{ h.quot }}
                  </blockquote>
               </div>
            </div>
         </div>
      </div>
      </div>
   </div>

   <div v-for="te in lop" class="container loads">
   <div class="row">
      <div class="col s12 m3 l3"></div>
      <div class="col s12 m6 l6">
      <div class="ph-item">
         <div class="ph-col-2">
            <div class="ph-avatar"></div>
         </div>
         <div class="ph-col-6" style="margin-left: -20px">
            <div class="ph-row">
               <div style="margin-top:22px;" class="ph-col-12"></div>
               <div class="ph-col-8"></div>
            </div>
         </div>
         <div class="ph-col-12">
            <div class="ph-picture"></div>
         </div>
      </div>
      </div>
   </div>
</div>

   <div class="container-fluid" style="margin-top: 30px;margin-bottom: 100px;">
     <div class="row">
       <div class="col s12 m3 l3"></div>
       <div class="col s12 m6 l6">
         <center v-if="next[0] == true">
           <button v-on:click="cari" class="btn red">Lihat lainnya</button>
         </center>
       </div>
       </div>
     </div>
   </div>

</div>


<div class="container-fluid">
      <div class="row">
         <nav style="background:white;border-top:1px solid silver" class="navbar menu">
         <div class="col s12 m3 l3"></div>
         <div class="col s12 m6 l6">
            <ul class="navbar-nav nav-justified">
               <center>
               <li class="nav-item col s3">
                  <router-link to="home" class="nav-link">
                     <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" fill="black" class="bi bi-house-door" viewBox="0 0 16 16">
		                  <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
                     </svg>
                  </router-link>
               </li>
               <li class="nav-item col s3">
                  <router-link to="cari" class="nav-link">
                     <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" fill="#03BAFF" class="bi bi-search" viewBox="0 0 16 16">
                       <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                     </svg>
                  </router-link>
               </li>
               <li class="nav-item col s3">
                  <router-link to="bookmark" class="nav-link">
                     <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" fill="black" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                     </svg>
                  </router-link>
               </li>
	            <li class="nav-item col s3">
                  <router-link to="about" class="nav-link">
                     <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" fill="black" class="bi bi-info-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                     </svg>
                  </router-link>
               </li>
            </ul>
            </div>
         </nav>
      </div>
   </div>
</section>
`,
   data() {
      return {
         lop: [1, 2],
         next: [],
         page: [1],
         tam: [],
         qu: [],
         tok: "",
         disabled: false
      }
   }
   ,
   mounted() {
      let loading = document.getElementsByClassName("loads");
      for (a = 0; a < loading.length; a++) {
         loading[a].hidden = true;
      }

   },
   methods: {
      addbook: function () {
         let data_book = JSON.parse(localStorage["bookmark"]);
         var dat = data_book;
         let tam = this.tam;
         let arrayWitoutDuplicates;
         let cek = [];

         for (er = 0; er < dat.length; er++) {
            cek.push(event.target.getAttribute("kata") == dat[er].quot);
         }

         let ro = cek + "";
         let ceki = ro.search("true");
         if (ceki == -1) {
            dat.push({
               quot: event.target.getAttribute("kata"),
               tokoh: event.target.getAttribute("nama"),
               ket: event.target.getAttribute("ket")
            });
         }
         localStorage["bookmark"] = JSON.stringify(dat);
         let r = document.getElementById(event.target.getAttribute("kata"));
         let bok = document.getElementsByClassName("bok_" + event.target.getAttribute('kata'));
         r.style = "display:null;margin-left:5px";
         for (l in bok) {
            bok[l].innerHTML = "";
         }
      },
      reset: function () {
         let loading = document.getElementsByClassName("loads");
         for (n = 0; n < loading.length; n++) {
            loading[n].hidden = true;
         }
         document.getElementById("q").disabled = false;
         this.disabled = false;
         this.page = [1];
         this.tam = [];
         this.qu = [];
         this.next = [];
      },

      cari: function () {
         let q = document.getElementById("q").value.replace(/[" "]/g, "-");
         document.getElementById("q").disabled = true;
         this.disabled = true;

         let qu = this.qu;

         qu.unshift(q);

         let data_book = JSON.parse(localStorage["bookmark"]);
         this.tok = q;
         let loading = document.getElementsByClassName("loads");
         let pa = this.page;
         let tam = this.tam;
         let next = this.next;

         for (a = 0; a < loading.length; a++) {
            loading[a].hidden = false;
         }

         let uri = 'https://limitless-sea-61725.herokuapp.com/https://twindev.herokuapp.com/api/v1/kata-bijak/kata/cari?q=' + qu[0] + '&page=' + pa[0];

         next.unshift(false);
         axios.get(uri)
            .then(res => {
               next.unshift(res.data.next);
               pa.unshift(parseInt(pa[0]) + 1);

               for (a = 0; a < loading.length; a++) {
                  loading[a].hidden = true;
               }

               let pol = [];
               let oi;

               for (y = 0; y < res.data.results.length; y++) {
                  for (t = 0; t < data_book.length; t++) {
                     if (res.data.results[y].kata == data_book[t].quot) {
                        pol.push(true);
                     }
                     else {
                        pol.push(false);
                     }
                  }

                  oi = pol + "";
                  let find = oi.search("true");
                  if (find !== -1) {
                     tam.push({
                        nama: res.data.results[y].tokoh,
                        ket: res.data.results[y].ket,
                        quot: res.data.results[y].kata,
                        bookmark: true
                     });
                  }
                  else {
                     tam.push({
                        nama: res.data.results[y].tokoh,
                        ket: res.data.results[y].ket,
                        quot: res.data.results[y].kata,
                        bookmark: false
                     });

                  }
                  pol = [];
               }

            })
            .catch(er => alert(er));
      }
   }
}


const load = {
   template: `
<section class="loading">
   <div>
      <center>
         <img src="../img/logo.png" class="responsive-img">
         <h4 class="white-text">ZoneKata</h4>
      </center>
   </div>
</section>
`,
   data() {
      return {
      }
   },
   mounted() {
      topbar.show();
      setTimeout(() => {
         topbar.hide();
         router.push("/home");
      }, 3000);
   },
   methods: {
   },
   watch: {
   }
}


const home = {
   template: `
<section style="margin-top: 10px;">
   <div v-for="h in tam" v-if="tam.length > 0" style="margin-bottom: -20px;" class="container">
      <div class="row">
         <div class="col s12 m3 l3"></div>
         <div class="col s12 m6 l6">
         <div class="card horizontal z-depth-5">
            <div class="card-stacked">
               <div class="card-content">
                  <div class="head-card">
                     <img src="../img/logo.png">
                     <div class="col s10">
                        <b>{{ h.nama.replace(/[_]/g," ") }}</b>
                        <br>
                        <small>{{ h.ket }}</small>
                     </div>
		     <div style="display:flex" class="col s2">
                     <div v-show="h.bookmark" v-bind:id="h.quot">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" fill="currentColor" class="bi bi-bookmark-check" viewBox="0 0 16 16">
                           <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                           <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                        </svg>
                     </div>
                     <div v-show="!h.bookmark" v-bind:kata="h.quot" v-bind:ket="h.ket" v-bind:nama="h.nama" v-on:click="addbook" v-bind:class="'book_'+h.quot">
                        <svg v-bind:class="'bok_'+h.quot" v-bind:nama="h.nama" v-bind:kata="h.quot" v-bind:ket="h.ket" xmlns="http://www.w3.org/2000/svg" width="1.6em" fill="currentColor" class="bi bi-bookmark-plus" viewBox="0 0 16 16">
                          <path v-bind:class="'bok_'+h.quot" v-bind:kata="h.quot" v-bind:ket="h.ket" v-bind:nama="h.nama" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                          <path v-bind:class="'bok_'+h.quot" v-bind:kata="h.quot" v-bind:ket="h.ket" v-bind:nama="h.nama" d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"/>
                        </svg>
                     </div>
                     </div>
                  </div>
                  <blockquote id="hakata">
                     {{ h.quot }}
                  </blockquote>
               </div>
            </div>
         </div>
         </div>
         <div class="col s12 m3 l3"></div>
      </div>
   </div>
   <div v-for="te in lop" class="container load">
      <div class="row">
         <div class="col s12 m3 l3"></div>
         <div class="col s12 m6 l6">
         <div class="ph-item">
            <div class="ph-col-2">
               <div class="ph-avatar"></div>
            </div>
            <div class="ph-col-6" style="margin-left: -20px">
               <div class="ph-row">
                  <div style="margin-top:22px;" class="ph-col-12"></div>
                  <div class="ph-col-8"></div>
               </div>
            </div>
            <div class="ph-col-12">
               <div class="ph-picture"></div>
            </div>
         </div>
         </div>
      </div>
   </div>

   <div class="container-fluid" style="margin-top: 30px;margin-bottom: 100px;">
     <div class="row">
         <div class="col s12 m3 l3"></div>
         <div class="col s12 m6 l6">
       <div class="col s6">
         <center v-if="next[0] == true">
   	   <button v-on:click="req(q[0],page[0])" class="btn red">Lihat lainnya</button>
         </center>
       </div>
       <div class="col s6">
         <center v-if="tam.length > 0">
           <button v-on:click="random" class="btn red">Acak tokoh</button>
         </center>
       </div>
       </div>
     </div>
   </div>

   <div class="container-fluid">
      <div class="row">
         <nav style="background:white;border-top:1px solid silver" class="navbar menu">
         <div class="col s12 m3 l3"></div>
         <div class="col s12 m6 l6">
            <ul class="navbar-nav nav-justified w-100">
               <center>
               <li class="nav-item col s3">
                  <router-link to="home" class="nav-link">
                     <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" fill="#03BAFF" class="bi bi-house-fill" viewBox="0 0 16 16">
                        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
                     </svg>
                  </a>
               </li>
               <li class="nav-item col s3">
                  <router-link to="cari" class="nav-link">
                     <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" fill="black" class="bi bi-search" viewBox="0 0 16 16">
		       <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                     </svg>
                  </router-link>
               </li>
               <li class="nav-item col s3">
                  <router-link to="bookmark" class="nav-link">
                     <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" fill="black" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                     </svg>
                  </router-link>
               </li>
	       <li class="nav-item col s3">
                  <router-link to="about" class="nav-link">
                     <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" fill="black" class="bi bi-info-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                     </svg>
                  </router-link>
               </li>
            </ul>
         </div>
         </nav>
      </div>
   </div>
</section>
`,
   data() {
      return {
         lop: [1, 2],
         next: [],
         page: [1],
         q: [],
         tam: []
      }
   },
   methods: {
      addbook: function () {
         let data_book = JSON.parse(localStorage["bookmark"]);
         var dat = data_book;
         let tam = this.tam;
         let arrayWitoutDuplicates;

         let cek = [];

         for (er = 0; er < dat.length; er++) {
            cek.push(event.target.getAttribute("kata") == dat[er].quot);
         }

         let ro = cek + "";
         let ceki = ro.search("true");
         if (ceki == -1) {
            dat.push({
               quot: event.target.getAttribute("kata"),
               tokoh: event.target.getAttribute("nama"),
               ket: event.target.getAttribute("ket")
            });
         }

         localStorage["bookmark"] = JSON.stringify(dat);
         let r = document.getElementById(event.target.getAttribute("kata"));
         let bok = document.getElementsByClassName("bok_" + event.target.getAttribute('kata'));
         r.style = "display:null;margin-left:5px";
         for (l in bok) {
            bok[l].innerHTML = "";
         }
      },
      req: function (tok, pa) {
         let q = this.q;
         let data_book = JSON.parse(localStorage["bookmark"]);
         let loading = document.getElementsByClassName("load");
         let btn = document.getElementsByClassName("btn");
         let next = this.next;
         let page = this.page;
         let tam = this.tam;

         q.unshift(tok);

         for (t = 0; t < btn.length; t++) {
            btn[t].disabled = true;
         }

         for (a = 0; a < loading.length; a++) {
            loading[a].hidden = false;
         }

         next.unshift(false);

         let uri = 'https://limitless-sea-61725.herokuapp.com/https://twindev.herokuapp.com/api/v1/kata-bijak/kata/tokoh?q=' + q[0] + '&page=' + pa;
         axios.get(uri)
            .then(res => {
               page.unshift(parseInt(page[0]) + 1);
               for (a = 0; a < loading.length; a++) {
                  loading[a].hidden = true;
               }
               for (t = 0; t < btn.length; t++) {
                  btn[t].disabled = false;
               }
               next.unshift(res.data.next);

               let pol = [];
               let oi;


               for (y = 0; y < res.data.results.length; y++) {
                  for (t = 0; t < data_book.length; t++) {
                     if (res.data.results[y] == data_book[t].quot) {
                        pol.push(true);
                     }
                     else {
                        pol.push(false);
                     }
                  }

                  oi = pol + "";
                  let find = oi.search("true");
                  if (find !== -1) {
                     tam.push({
                        nama: res.data.tokoh,
                        ket: res.data.keterangan,
                        quot: res.data.results[y],
                        bookmark: true
                     });
                  }
                  else {
                     tam.push({
                        nama: res.data.tokoh,
                        ket: res.data.keterangan,
                        quot: res.data.results[y],
                        bookmark: false
                     });
                  }
                  pol = [];
               }

            })
            .catch(er => alert(er));
      },

      random: function () {
         let ak = Math.floor(Math.random() * 2);
         let data_book = JSON.parse(localStorage["bookmark"]);
         let loading = document.getElementsByClassName("load");
         let btn = document.getElementsByClassName("btn");
         let page = this.page;

         page.unshift(1);
         for (t = 0; t < btn.length; t++) {
            btn[t].disabled = true;
         }

         for (b = 0; b < loading.length; b++) {
            loading[b].hidden = false;
         }

         axios.get("https://limitless-sea-61725.herokuapp.com/https://twindev.herokuapp.com/api/v1/kata-bijak/kategori/tokoh?q=negara-indonesia&page=" + (parseInt(ak) + 1))
            .then(res => {
               for (b = 0; b < loading.length; b++) {
                  loading[b].hidden = true;
               }
               for (t = 0; t < btn.length; t++) {
                  btn[t].disabled = false;
               }
               let ka = Math.floor(Math.random() * res.data.results.length);
               this.req(res.data.results[ka].nama, 1);
            })
            .catch(er => alert(er));
      }
   },
   mounted() {
      this.lop = [1, 2],
         this.next = [],
         this.page = [1],
         this.q = [];
      this.tam = [];
      this.random();
   }
}
const bookmark = {
   template: `
<section>
  <div class="container-fluid" style="z-index:5;position:fixed">
      <div class="row">
         <nav style="background:white;border-top:1px solid silver" class="navbar menu">
         <div class="col s12 m3 l3"></div>
         <div class="col s12 m6 l6">
            <ul class="navbar-nav nav-justified w-100">
               <center>
               <li class="nav-item col s3">
                  <router-link to="home" class="nav-link">
                     <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" fill="black" class="bi bi-house-door" viewBox="0 0 16 16">
                       <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
                     </svg>
                  </router-link>
               </li>
               <li class="nav-item col s3">
                  <router-link to="cari" class="nav-link">
                     <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" class="bi bi-search" viewBox="0 0 16 16">
                       <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                     </svg>
                  </router-link>
               </li>
               <li class="nav-item col s3">
                  <router-link to="bookmark" class="nav-link">
                     <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" fill="#03BAFF" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                     </svg>
                  </router-link>
               </li>
	       <li class="nav-item col s3">
                  <router-link to="about" class="nav-link">
		     <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" fill="black" class="bi bi-info-circle" viewBox="0 0 16 16">
		        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
		        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
		     </svg>
                  </router-link>
               </li>
            </ul>
         </div>
         </nav>
      </div>
   </div>

 <div style="margin-top:10px;z-index:2;margin-bottom:70px;">
   <div class="container" v-if="tam.length == 0">
       <div class="row">
       <div class="col s12 m3 l3"></div>
    <div class="col s12 m6 l6">
      <div class="card white">
        <div class="card-content">
          <span class="card-title red-text">Tidak ada apapun disini</span>
          <p>Kelihatannya kamu belum menandai kata manapun. Tekan simbol
	  <svg xmlns="http://www.w3.org/2000/svg" width="1em" fill="currentColor" class="bi bi-bookmark-plus" viewBox="0 0 16 16">
							    
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"/>
          </svg>
          untuk menandai kata.
	  </p>
        </div>
      </div>
    </div>
  </div>
   </div>
   <div v-for="h in tam" v-if="tam.length > 0" style="margin-bottom: -20px;" class="container">
      <div class="row">
         <div class="col s12 m3 l3"></div>
         <div class="col s12 m6 l6">
         <div class="card horizontal z-depth-5">
            <div class="card-stacked">
               <div class="card-content">
                  <div class="head-card">
                     <img src="../img/logo.png">
                     <div class="col s10">
                        <b>{{ h.nama.replace(/[_]/g," ") }}</b>
                        <br>
                        <small>{{ h.ket }}</small>
                     </div>
                     <div style="display:flex" class="col s2" v-bind:kata="h.quot">
                     <div v-on:click="delbook(h.quot)" v-show="h.bookmark" v-bind:id="h.quot">
                        <svg v-bind:class="'bok_'+h.quot" v-bind:kata="h.quot" v-bind:ket="h.ket" v-bind:nama="h.nama" xmlns="http://www.w3.org/2000/svg" width="1.6em" fill="currentColor" class="bi bi-bookmark-x" viewBox="0 0 16 16">
                           <path v-bind:class="'bok_'+h.quot" v-bind:kata="h.quot" v-bind:ket="h.ket" v-bind:nama="h.nama" fill-rule="evenodd" d="M6.146 5.146a.5.5 0 0 1 .708 0L8 6.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 7l1.147 1.146a.5.5 0 0 1-.708.708L8 7.707 6.854 8.854a.5.5 0 1 1-.708-.708L7.293 7 6.146 5.854a.5.5 0 0 1 0-.708z"/>
                           <path v-bind:class="'bok_'+h.quot" v-bind:kata="h.quot" v-bind:ket="h.ket" v-bind:nama="h.nama" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                        </svg>
                     </div>
                     <div v-show="!h.bookmark" v-bind:kata="h.quot" v-bind:ket="h.ket" v-bind:nama="h.nama" v-bind:class="'book_'+h.quot">
                        <svg v-bind:class="'bok_'+h.quot" v-bind:nama="h.nama" v-bind:kata="h.quot" v-bind:ket="h.ket" xmlns="http://www.w3.org/2000/svg" width="1.6em" fill="currentColor" class="bi bi-bookmark-plus" viewBox="0 0 16 16">
                          <path v-bind:class="'bok_'+h.quot" v-bind:kata="h.quot" v-bind:ket="h.ket" v-bind:nama="h.nama" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                          <path v-bind:class="'bok_'+h.quot" v-bind:kata="h.quot" v-bind:ket="h.ket" v-bind:nama="h.nama" d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"/>
                        </svg>
                     </div>
                     </div>
                  </div>
                  <blockquote id="hakata">
                    {{ h.quot }}
                  </blockquote>
               </div>
            </div>
         </div>
         </div>
      </div>
   </div>
 </div>
</section>
`,
   data() {
      return {
         tam: []
      }
   },
   methods: {
      delbook: function (kat) {
         let tam = this.tam;
         let dbku = JSON.parse(localStorage["bookmark"]);

         for (p in tam) {
            if (kat == tam[p].quot) {
               tam.splice(p, 1);
            }
         }

         for (t in dbku) {
            if (kat == dbku[t].quot) {
               let ar = JSON.parse(localStorage["bookmark"]);
               ar.splice(t, 1);
               localStorage["bookmark"] = JSON.stringify(ar);
            }
         }

      }
   },
   mounted() {
      this.tam = [];
      let tam = this.tam;
      let db = JSON.parse(localStorage["bookmark"]);

      for (r = db.length - 1; r > 1; r--) {
         tam.push({
            quot: db[r].quot,
            ket: db[r].ket,
            nama: db[r].tokoh,
            bookmark: true
         });
      }
   },

   watch: {
      tam: function (val) {
         //     alert(val);
      }
   }
}
const about = {
   template: `
<section>
  <div class="container-fluid" style="z-index:5;position:fixed">
      <div class="row">
         <nav style="background:white;border-top:1px solid silver" class="navbar menu">
         <div class="col s12 m3 l3"></div>
         <div class="col s12 m6 l6">
            <ul class="navbar-nav nav-justified w-100">
               <center>
               <li class="nav-item col s3">
                  <router-link to="home" class="nav-link">
                     <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" fill="black" class="bi bi-house-door" viewBox="0 0 16 16">
                       <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
                     </svg>
                  </router-link>
               </li>
               <li class="nav-item col s3">
                  <router-link to="cari" class="nav-link">
                     <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" class="bi bi-search" viewBox="0 0 16 16">
                       <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                     </svg>
                  </router-link>
               </li>
               <li class="nav-item col s3">
                  <router-link to="bookmark" class="nav-link">
                     <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                     </svg>
                  </router-link>
               </li>
	       <li class="nav-item col s3">
                  <router-link to="about" class="nav-link">
		     <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" fill="#03BAFF"class="bi bi-info-circle" viewBox="0 0 16 16">
		        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
		        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
		     </svg>
                  </router-link>
               </li>
            </ul>
         </div>
         </nav>
      </div>
  </div>

 <div style="margin-top:10px;z-index:2;margin-bottom:70px;">
   <div class="container">
     <div class="row">
     <div class="col s12 m3 l3"></div>
     <div class="col s12 m6 l6">
          <div class="card white">
            <div class="card-content">
              <center><span class="card-title red-text">ZoneKata v1.0</span></center>
	      <p>Sebuah zona yang berisi tentang kata-kata dari berbagai tokoh terkenal.</p>
	      <br>
	      <center><p>Make with
<svg xmlns="http://www.w3.org/2000/svg" style="width:9px" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
</svg>
by ricko-v</p></center>
            </div>
          </div>
        </div>
      </div>
   </div>
 </div>
</section>
`,
   data() {
      return {
      }
   },
   methods: {
   },
   mounted() {
   }
}
