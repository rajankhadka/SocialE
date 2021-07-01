/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {

}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {

}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {

}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {

}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {

}


//sidebar css





@media screen and (max-width:420px){
    .sideBar__body__sideBar{
      width: 50px !important;
    }
  
    .sideBar__body__sideBar__header{
      display: none;
    }
  
    .sideBar__body__sideBar__content{
      height: 100%;
    }
  } 
  
  @media screen and (min-width:421px){
    .sideBar__body__sideBar__header{
      display: flex;
    }
  
    .sideBar__body__sideBar__content{
      height: 92%;
    }
  }
  
  .sideBar__body__sideBar {
    /* flex: 0.17; */
    /* width: 200px; */
    background-color: #2a3f54;
  }
  
  .sideBar__body__sideBar__header {
    /* display: flex; */
    justify-content: flex-end;
  }
  
  .sideBar__body__sideBar__content {
    color: white;
    font-size: 8px;
    margin-top: -15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* background-color: aqua; */
    flex: 1;
    
  }
  
  
  .bodycontent__top > div,
  .bodycontent__bottom > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 10px;
    height: 60px;
    cursor: pointer;
    /* background-color: aqua; */
    box-sizing: border-box;
    height: 9vh;
  }
  
  /* .sideBar__body__sideBar__content > div:hover {
    border-right: 5px solid black;
  } */
  
  .bodycontent__top > div > h1 ,
  .bodycontent__bottom > div > h1{
    font-weight: 300;
    flex: 0.9;
    padding-left: 10px;
  }
  