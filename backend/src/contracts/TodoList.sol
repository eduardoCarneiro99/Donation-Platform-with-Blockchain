pragma solidity ^0.5.0;

contract TodoList {
    uint public taskCount = 0;

    function setTaskCount(uint256 _newCount) external {
        taskCount = _newCount;
    }
}
