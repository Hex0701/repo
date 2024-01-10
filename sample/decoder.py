def decode(message_file):
    with open(message_file, 'r') as file:
        lines = file.readlines()

    # Short the numbers and words from each line
    pairs = [line.split() for line in lines]
        
    pairs = sorted(pairs, key=lambda x: int(x[0]))

    # Decode the hidden message 
    decoded_pairs = []

    for pair in pairs:
        n = 1
        while n <= len(pairs):
            if int(pair[0]) == (n * (n + 1)) // 2:
                decoded_pairs.append(pair[1])
            n += 1

    # Convert the message to string
    decoded_msg = ' '.join(decoded_pairs)

    return decoded_msg

# Example usage
message_file = 'C:/Users/aakas/Downloads/coding_qual_input.txt'
result = decode(message_file)
print(result)
