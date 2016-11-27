var roleBuilder = {
   run: function(creep) {
        var enemies= creep.room.find(Game.HOSTILE_CREEPS);
        if(enemies.length>0){
            creep.say('attack')
            creep.moveTo(enemies[0]);
            creep.attack(enemies[0]);
        }
	},
    create: function(game){
        var creeps = _.filter(game.creeps,(creep)=>creep.memory.role === 'attacker');
       //TODO find way to check for structures without using creeps
	    if(creeps.length < 2){
            console.log('create attacker')
	        game.spawns.Spawn1.createCreep([TOUGH,ATTACK,MOVE],{role:'attacker'})
	    }
    }
    
};

module.exports = roleBuilder;