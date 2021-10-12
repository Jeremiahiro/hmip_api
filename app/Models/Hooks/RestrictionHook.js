
"use strict";

const RestrictionHook = (exports = module.exports = {});

RestrictionHook.noDeleteLocked = async modelInstance => {
    if (modelInstance.IsLocked) {
        throw new Error("Item is Locked");
    }
};
