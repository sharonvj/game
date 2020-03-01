import { Component, OnInit,HostListener } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  
  public boxes:any[][];
  public isWon:boolean;
  public isFail:boolean;
  constructor() { 
   
  }

  ngOnInit() {
   this.init()
  }

  init(){
    this.boxes = [[{id:0,isSelected:false,color:'',r:4,b:1},{id:1,isSelected:false,color:'',r:5,b:2,t:0},{id:2,isSelected:false,color:'',r:3,b:6,t:1},{id:3,isSelected:false,color:'',r:7,t:2}],
                 [{id:4,isSelected:false,color:'',r:8,b:5,l:0},{id:5,isSelected:false,color:'',r:9,b:6,l:1,t:4},{id:6,isSelected:false,color:'',r:10,b:7,l:2,t:5},{id:7,isSelected:false,color:'',r:11,l:3,t:6}],
                 [{id:8,isSelected:false,color:'',r:12,b:9,l:4},{id:9,isSelected:false,color:'',r:13,b:10,l:5,t:8},{id:10,isSelected:false,color:'',r:14,b:11,l:6,t:9},{id:11,isSelected:false,color:'',r:15,l:7,t:10}],
                 [{id:12,isSelected:false,color:'',b:13,l:8},{id:13,isSelected:false,color:'',b:14,l:9,t:12},{id:14,isSelected:false,color:'',b:15,l:10,t:13},{id:15,isSelected:false,color:'',l:11,t:14}]
                 ]
    this.isWon = false
    this.isFail = false
    var initValue  = this.getRandomValueFirst()
    this.setRandom('green',initValue,true);
    this.setRandom('green',this.getRandomValueSecond(this.getBoxbyId(initValue)));
  }


  setById(Id,nextId){
    this.boxes.map(c=>{
      if(c.filter(x=>x.id == nextId)[0] && c.filter(x=>x.id == nextId)[0].color == ''){
        c.filter(x=>x.id == nextId)[0].isSelected = true;
        c.filter(x=>x.id == nextId)[0].color = 'green';
        this.reset(Id)
      }
    });
  }

  reset(id){
     this.boxes.map(c=>{
      if(c.filter(x=>x.id == id)[0]){
        c.filter(x=>x.id == id)[0].isSelected = false;
        c.filter(x=>x.id == id)[0].color = '';
      }
    });
  }

  getBoxbyId(id){
  var ob = {}
   this.boxes.map(c=>{
      if(c.filter(x=>x.id == id)[0]){
        ob = c.filter(x=>x.id == id)[0];
      }
    });
   return ob;
  }

  startGame(){
    this.init()
  }

  setRandom(color,Id,isSelected=false){
    this.boxes.map(x=>{
       if(x.filter(x=>x.id == Id)[0]){
        x.filter(x=>x.id == Id)[0].color = color;
        x.filter(x=>x.id == Id)[0].isSelected = isSelected;
       }
    });
  }


  userTurn(KEY){
   let isSelected = {id:'',isSelected:'',color:'',r:'',b:'',l:'',t:''};
   let otherBox = {id:'',isSelected:'',color:'',r:'',b:'',l:'',t:''};
   this.boxes.map(x=>{
       if(x.filter(x=>x.isSelected == true)[0]){
        isSelected = x.filter(x=>x.isSelected == true)[0]
       }
       if(x.filter(x=>x.isSelected != true && x.color == 'green')[0]){
        otherBox = x.filter(x=>x.isSelected != true && x.color == 'green')[0];
       }
    });
   switch(KEY){
    case 39:
    this.setById(isSelected.id,isSelected.r);
    this.checkGameStatus(otherBox)
    if('r' in isSelected)
    this.computerTurn(this.getBoxbyId(otherBox.id))
    break;
    case 37:
    this.setById(isSelected.id,isSelected.l);
    this.checkGameStatus(otherBox)
    if('l' in isSelected)
    this.computerTurn(this.getBoxbyId(otherBox.id))
    break;
    case 38:
    this.setById(isSelected.id,isSelected.t);
    this.checkGameStatus(otherBox)
    if('t' in isSelected)
    this.computerTurn(this.getBoxbyId(otherBox.id))
    break;
    case 40:
    this.setById(isSelected.id,isSelected.b);
    this.checkGameStatus(otherBox)
    if('b' in isSelected)
    this.computerTurn(this.getBoxbyId(otherBox.id))
    break;
   }

  }

  checkGameStatus(otherBox){
    let otherBoxCopy = {...otherBox};
    delete otherBoxCopy.id
    delete otherBoxCopy.isSelected
    delete otherBoxCopy.color;
    this.boxes.map(c=>{
     let won = c.filter(x=>(x.id == otherBox.r ||x.id == otherBox.l||x.id == otherBox.t||x.id == otherBox.b) && x.color == 'green' )
      if(won.length>0)
        this.isWon = true;

    });


    let obj = Object.keys(otherBoxCopy).map(x=>otherBoxCopy[x]);
    let nearby =[]
    obj.forEach(each=>{
     this.boxes.map(c=>{
       if(c.filter(x=>x.id == each).length>0)
       nearby.push(c.filter(x=>x.id == each)[0]);
      });
    });
    
    if(nearby.filter(x=>x.color =='red').length == nearby.length){
      this.isFail = true;
    }
  }

  getRandomValueSecond(initBox){
    let items = []
    this.boxes.map(c=>{
      let selected = c.filter(x=>x.color == '' && x.id!= initBox.r && x.id !=initBox.b && x.id!= initBox.l && x.id !=initBox.t)
       selected.filter(x=>{
         items.push(x.id);
       });
    });
    return items[Math.floor(Math.random() * items.length)];
  }

  getRandomValueFirst(){
    let items = []
    this.boxes.map(x=>{
       let selected = x.filter(x=>x.color == '')[0]
       if(selected){
        items.push(selected.id);
       }
    });
    return items[Math.floor(Math.random() * items.length)];
  }

  getRandomValueComputer(selectedBox){
    let items = []
    this.boxes.map(c=>{
      var selectedObj = c.filter(x=>x.color == '');
       selectedObj.filter(x=>{
       if((x.id == selectedBox.r || x.id == selectedBox.b || x.id == selectedBox.t||x.id == selectedBox.l)){
         items.push(x.id);
       }
      });
    });
    let random = items[Math.floor(Math.random() * items.length)];
    return random
  }

  computerTurn(isSelected){
    if(this.getRandomValueComputer(isSelected))
     this.setRandom('red',this.getRandomValueComputer(isSelected));
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(!this.isFail && !this.isWon)
     this.userTurn(event.keyCode);
  }
   

}
