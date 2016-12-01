var roleBuilder = {
   run: function(creep) {
        var enemies= creep.room.find(FIND_HOSTILE_CREEPS);
          console.log("enmies at the gate"+ enemies.length)
        if(enemies.length>0){
            creep.say('attack')
            creep.moveTo(enemies[0]);
            creep.attack(enemies[0]);
        }
	},
    create: function(game){

        if(Object.keys(Game.creeps).length > 0){
            var someCreep = Game.creeps[Object.getOwnPropertyNames(Game.creeps)[0]];
            var enemies = someCreep.room.find(FIND_HOSTILE_CREEPS);
            if(enemies.length > 0){
                var creeps = _.filter(game.creeps,(creep)=>creep.memory.role === 'attacker');
                //use harvesters to look for enemies and only create if you have atackers...   
                if(creeps.length < 4){
                    console.log('create attacker')
                    //TOUGHT = 10 X 2 = 20
                    //Attack = 80 X 2 = 160
                    //MOVE = 50 X 3 = 150
                    game.spawns.Spawn1.createCreep([TOUGH,TOUGH,ATTACK,ATTACK,MOVE,MOVE,MOVE],{role:'attacker'})
                }
            }
        } 
    }
    
};

module.exports = roleBuilder;