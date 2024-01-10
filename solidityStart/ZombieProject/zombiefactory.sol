pragma solidity >=0.5.0 <0.6.0;
contract zombieFactory{
    uint dnaDigits = 16;
    uint dnaModule = 10^dnaDigits;

    struct Zombie {
        string name;
        uint dna;
    }

    Zombie[] public zombies;

    event NewZombie(uint zombieId, string name, uint dna);

    function _createZombie(string memory _name, uint _dna) private{
        zombies.push(Zombie(_name, _dna));
        uint id = zombies.length - 1;
        emit NewZombie(id, _name, _dna);
        }

    function _genRandDna(string memory _str) private view returns (uint){
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModule;
    }

    function createRandZombie(string memory _name) public {
        uint randDna = _genRandDna(_name);
        _createZombie(_name, randDna);
    }
}