var creepHelper = {
    CreateWorkerCreep: function(roleName, potentialEnergyStored){
        //TOUGHT = 10 X 0 = 0
        //Attack = 80 X 0 = 0
        //MOVE = 50 X 2 = 100
        //CARRY = 50 X 2 = 100
        //WORK = 100 X 2 = 200
        //TOTAL = 400

        //move(50) carry(50) work(100) = 200
         
	  
	        
        var partsToAppend = [MOVE,CARRY,WORK];
        var selectedParts = [MOVE,CARRY,WORK];
        var eneergyRequiredToCreateCreep = 200;
        
        while(eneergyRequiredToCreateCreep < potentialEnergyStored){
            if(eneergyRequiredToCreateCreep + 200 > potentialEnergyStored)
                break;

            selectedParts = selectedParts.concat(partsToAppend);
            eneergyRequiredToCreateCreep = eneergyRequiredToCreateCreep + 200;
        }

        Game.spawns.Spawn1.createCreep(selectedParts,{role:roleName})
    }
	
    
}


module.exports = creepHelper;