var roleBuilder = {
   run: function(creep) {
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
			else{
				//kill the creep if there are no more constuction sites.
				creep.suicide();
			}
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
	    }
	},
    create: function(game){
        var creeps = _.filter(game.creeps,(creep)=>creep.memory.role === 'builder');
       //TODO find way to check for structures without using creeps
	   //only create builders if there are things to build.
	    var harvesters = _.filter(game.creeps,(creep)=>creep.memory.role === 'harvester');
		if(harvesters.length >1 && harvesters[0].room.find(FIND_CONSTRUCTION_SITES).length > 1)
			if(creeps.length < 3){
				game.spawns.Spawn1.createCreep([MOVE,MOVE, CARRY, WORK],{role:'builder'})
			}
    }
    
};

module.exports = roleBuilder;