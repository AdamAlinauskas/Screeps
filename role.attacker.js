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
        var creeps = _.filter(game.creeps,(creep)=>creep.memory.role === 'attacker');
       //use harvesters to look for enemies and only create if you have atackers...   
	    if(creeps.length < 0){
            console.log('create attacker')
	        game.spawns.Spawn1.createCreep([TOUGH,ATTACK,ATTACK,MOVE,MOVE],{role:'attacker'})
	    }
    }
    
};

module.exports = roleBuilder;