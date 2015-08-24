
/**
 * Simple timer between when initially called and returned function is called
 **/
export default function timer() {
    var start = new Date().getTime();

    return function() {
        var stop = new Date().getTime();

        return stop - start;
    };
};

