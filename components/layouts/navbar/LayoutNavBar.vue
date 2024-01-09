<template>
    <section class="bg-navbar d-flex">       
        <div class="box-logo">
            <h1>HEOUT</h1>
        </div>
        <div class="content-search-bar">
            <div class="search-bar">
                <input type="text" placeholder="Search...">
                <button>Search</button>
                
            </div>
        </div>
    </section>
</template>

<script>
export default {
  data() {
    return {
      recognitionResult: '', 
    };
  },
  methods: {
    startRecognition() {
      const recognition = new SpeechRecognition();
      
      recognition.addEventListener("result", (event) => {
        console.log(event);

      });

      recognition.start();
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-navbar{
    background: #D9D9D9;
    min-height: 72px;
    height: 100%;
}
.box-logo{
    display: flex;
    justify-content: center;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 29px;
    width: 200px;
}
.content-search-bar{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.search-bar {
    display: flex;
    align-items: flex-end;
    background: #ffffff;
}

.search-bar input[type="text"] {
    padding: 8px;
    border: none;
    border-radius: 4px;
    margin-right: 5px;
}

.search-bar button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
}
</style>