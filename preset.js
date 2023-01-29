function config(entry = []) {
    return [...entry, require.resolve('./dist/cjs/preset/preview')];
}

function managerEntries(entry = []) {
    return [...entry, require.resolve('./dist/cjs/preset/manager')];
}

module.exports = {
    managerEntries,
    config,
};
