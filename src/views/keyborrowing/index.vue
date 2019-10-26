<template>
  <v-container-refresh :on-refresh="onRefresh">
    <KeyBorrowingList v-model="sampleData" :loading="false" />
  </v-container-refresh>
</template>

<script>
  const KeyBorrowingList = () => import('@/components/keyborrowing/KeyBorrowingList')

  export default {
    components: {
      KeyBorrowingList
    },
    data() {
      return {
        sampleData: [
          {
            upid: '2015-12584',
            name: 'Son Roy Almerol',
            room: 'Test Room Number',
            state: true,
            image: 'https://res.cloudinary.com/upd-cds/image/upload/v1555265020/ockzpuwpf5xzgd0030ae.jpg?imageView2/1/w/80/h/80'
          },
          {
            upid: '2015-12583',
            name: 'Test Developer',
            room: 'Test Room Number',
            state: true,
            image: 'https://res.cloudinary.com/upd-cds/image/upload/w_400,h_400,c_fill,g_face/v1564897161/xkffoahz210hhpbgylqa.jpg'
          },
          {
            upid: '2019-06250',
            name: 'TORRES ERIC JOSEPH',
            room: 'Test Room Number',
            state: true,
            image: 'https://res.cloudinary.com/upd-cds/image/upload/w_400,h_400,c_fill,g_face/v1564366242/j1qejhxssap0zpoltxoe.jpg'
          },
          {
            upid: '2019-07349',
            name: 'SARITA WILLIAM SIEGFRED',
            room: 'Test Room Number',
            state: true,
            image: 'https://res.cloudinary.com/upd-cds/image/upload/w_400,h_400,c_fill,g_face/v1565702670/xuccb46fteljlowlndrc.jpg'
          },
          {
            upid: '2019-09266',
            name: 'SALAMAT ALFONSO ROI',
            room: 'Test Room Number',
            state: true,
            image: 'https://res.cloudinary.com/upd-cds/image/upload/w_400,h_400,c_fill,g_face/v1564622950/pbvb9azgx6hb1ibubxy2.jpg'
          },
          {
            upid: '2019-11601',
            name: 'VILLAMOR FRANCIS GIO',
            room: 'Test Room Number',
            state: true,
            image: 'https://res.cloudinary.com/upd-cds/image/upload/w_400,h_400,c_fill,g_face/v1564280134/s9aacg2gs0lxbmlsj8ck.jpg'
          },
          {
            upid: '2015-12584',
            name: 'Son Roy Almerol',
            room: 'Test Room Number',
            state: true,
            image: 'https://res.cloudinary.com/upd-cds/image/upload/v1555265020/ockzpuwpf5xzgd0030ae.jpg?imageView2/1/w/80/h/80'
          },
          {
            upid: '2015-12583',
            name: 'Test Developer',
            room: 'Test Room Number',
            state: true,
            image: 'https://res.cloudinary.com/upd-cds/image/upload/w_400,h_400,c_fill,g_face/v1564897161/xkffoahz210hhpbgylqa.jpg'
          },
          {
            upid: '2019-06250',
            name: 'TORRES ERIC JOSEPH',
            room: 'Test Room Number',
            state: true,
            image: 'https://res.cloudinary.com/upd-cds/image/upload/w_400,h_400,c_fill,g_face/v1564366242/j1qejhxssap0zpoltxoe.jpg'
          },
          {
            upid: '2019-07349',
            name: 'SARITA WILLIAM SIEGFRED',
            room: 'Test Room Number',
            state: true,
            image: 'https://res.cloudinary.com/upd-cds/image/upload/w_400,h_400,c_fill,g_face/v1565702670/xuccb46fteljlowlndrc.jpg'
          },
          {
            upid: '2019-09266',
            name: 'SALAMAT ALFONSO ROI',
            room: 'Test Room Number',
            state: true,
            image: 'https://res.cloudinary.com/upd-cds/image/upload/w_400,h_400,c_fill,g_face/v1564622950/pbvb9azgx6hb1ibubxy2.jpg'
          },
          {
            upid: '2019-11601',
            name: 'VILLAMOR FRANCIS GIO',
            room: 'Test Room Number',
            state: true,
            image: 'https://res.cloudinary.com/upd-cds/image/upload/w_400,h_400,c_fill,g_face/v1564280134/s9aacg2gs0lxbmlsj8ck.jpg'
          },
        ]
      }
    },
    methods: {
      onRefresh: function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            resolve()
          }, 1000)
        })
      }
    }
  }
</script>