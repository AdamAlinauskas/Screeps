var roleUpgrader = require('role.upgrader');
var creepHelper = require('creep.helper');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        
        if(!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
            creep.say('harvesting');
	    }
	    
	    if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.harvesting = false;
	        creep.say('not harvesting')
	        
	    }
        
	    if(creep.memory.harvesting && creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);

			//Find closest
			var source = creep.pos.findClosestByRange(creep.room.find(FIND_SOURCES))
				
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
            return;
        }
		//else if(Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity) {
            
            
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN)
                }
        });
        
        var targetsThatNeedEnergy = targets.filter((x)=>x.energy < x.energyCapacity);
        
        if(targetsThatNeedEnergy.length >0){
            if(creep.transfer(targetsThatNeedEnergy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
                creep.moveTo(targetsThatNeedEnergy[0]);
            }
        }

        if(targets.every((structure) => structure.energy == structure.energyCapacity)){

            //Spawn's enerty is maxed out put harvester to use and upgrade the conrollers
            creep.say('Swiching to upgrading')
            roleUpgrader.upgrade(creep);
        }

	},
		
	create: function(game,potentialEnergyStored){
        var creeps = _.filter(Game.creeps,(creep)=>creep.memory.role === 'harvester');

        if(creeps.length < 4){
            creepHelper.CreateWorkerCreep('harvester',potentialEnergyStored);
        }
	}
};

module.exports = roleHarvester;