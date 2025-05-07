
/**
 * Formats a phone number input to (XXX) XXX-XXXX format
 */
export const formatPhoneNumber = (input: string): string => {
    // Strip all non-numeric characters
    const phoneNumber = input.replace(/\D/g, '');
    
    // Format according to length
    if (phoneNumber.length <= 3) {
        return phoneNumber;
    } else if (phoneNumber.length <= 6) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
};
