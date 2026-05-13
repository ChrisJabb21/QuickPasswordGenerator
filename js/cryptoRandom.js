/** Generate a secure cryptographically strong random integer using the Web Crypto API.
@param maxExclusive: The upper bound (exclusive) for the random integer. Must be a positive integer less than or equal to 0x7FFFFFFF (2^31 - 1).
@returns:  A random integer in the range [0, maxExclusive)
@throws: An error if maxExclusive is not a positive integer or exceeds 0x7FFFFFFF.
*/
export function secureRandomInt(maxExclusive){
    if (maxExclusive <= 0 || maxExclusive > 0x7FFFFFFF){
        throw new Error("bad range");
    }
    
    //uint32 is an array of 32-bit unsigned integers. We create an array of length 1 to hold a single random integer.
    const uint32 = new Uint32Array(1);

    // The limit is calculated to ensure that the random integer generated is uniformly distributed within the specified range.
    const limit = Math.floor(0x100000000 / maxExclusive) * maxExclusive;

    // We will keep generating random integer until we get one that is less than the limit. This ensures that the distribution of generated integers is uniform.
    let randomInt; 

    // The do-while loop continues to generate random integers until it finds one that is less than the limit. This is necessary to avoid bias in the distribution of generated integers.
    do {
        /* The Crypto.getRandomValues() method creates secure randomness */
        crypto.getRandomValues(uint32);
        // The first (and only) element of the uint32 array is assigned to randomInt.
        randomInt = uint32[0];
    } while (randomInt >= limit);

    // Return the random integer modulo maxExclusive to ensure it falls within the desired range.
    return randomInt % maxExclusive;
}