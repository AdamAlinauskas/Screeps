var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
      
	},
		
	create: function(game){
	   var upgraders = _.filter(game.creeps,(creep)=>creep.memory.role === 'harvester');
	    if(upgraders.length < 3){
	        game.spawns.Spawn1.createCreep([MOVE, CARRY, WORK],{role:'harvester'})
	    }
	}
};

module.exports = roleHarvester;