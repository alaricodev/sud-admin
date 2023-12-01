<template>
  <span v-if="tipo == 1" class="q-ml-xl stamp is-nope">{{ msg }}</span>
  <span v-if="tipo == 2" class="q-ml-xl stamp is-approved">{{ msg }}</span>
  <span v-if="tipo == 3" class="q-ml-xl stamp is-draft">{{ msg }}</span>
  <span v-if="tipo == 4" class="q-ml-xl stamp is-end">{{ msg }}</span>
</template>

<script>
export default {
  name: "LabelCarimbo",
  created() {},
  data() {
    return {};
  },
  props: {
    msg: {
      type: String,
      required: true,
    },
    tipo: {
      type: Number,
      required: false,
      default: 1,
    },
    // tipo 1: Carimbo vermelho de negado
    // tipo 2: Carimbo verde de aprovado
    // tipo 3: Carimbo Cinza, indiferente
  },
  methods: {},
};
</script>

<style>
.stamp {
  transform: rotate(12deg);
  color: #555;
  font-size: 3rem;
  font-weight: 700;
  border: 0.25rem solid #555;
  display: inline-block;
  padding: 0.25rem 1rem;
  text-transform: uppercase;
  border-radius: 1rem;
  font-family: "Courier";
  -webkit-mask-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/grunge.png");
  -webkit-mask-size: 944px 604px;
  mix-blend-mode: multiply;
}

.is-nope {
  color: #d23;
  border: 0.5rem double #d23;
  transform: rotate(3deg);
  -webkit-mask-position: 2rem 3rem;
  font-size: 2rem;
}

.is-approved {
  color: #0a9928;
  border: 0.5rem solid #0a9928;
  -webkit-mask-position: 13rem 6rem;
  transform: rotate(-14deg);
  border-radius: 0;
}

.is-end {
  color: #0a9928;
  border: 0.4rem solid #0a9928;
  -webkit-mask-position: 13rem 6rem;
  transform: rotate(-10deg);
  font-size: 1.5rem;
  border-radius: 0;
}

.is-draft {
  color: #c4c4c4;
  border: 1rem double #c4c4c4;
  transform: rotate(-5deg);
  font-size: 6rem;
  font-family: "Open sans", Helvetica, Arial, sans-serif;
  border-radius: 0;
  padding: 0.5rem;
}
</style>
