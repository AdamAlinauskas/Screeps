var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);

			//Find closest
			var source = creep.pos.findClosestByRange(creep.room.find(FIND_SOURCES))
				
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
		else if(Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity) {
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
        else if(Game.spawns['Spawn1'].energy == Game.spawns['Spawn1'].energyCapacity){
            //Spawn's enerty is maxed out put harvester to use and upgrade the conrollers
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