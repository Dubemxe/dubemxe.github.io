import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import LabelEncoder

# Load the dataset (Assuming it's in CSV format)
music_data = pd.read_csv('music_data.csv')

# Split the data into training and testing sets
train_data, test_data = train_test_split(music_data, test_size=0.2)

#label encode string values so they can be processed by the pivot table
convert = LabelEncoder()

# Encode string values to numerical labels
train_data['genre_encoded'] = convert.fit_transform(train_data['genre'])
print(train_data[['genre', 'genre_encoded']].head())

train_data['timestamp_encoded'] = convert.fit_transform(train_data['timestamp'])
print(train_data[['timestamp', 'timestamp_encoded']].head())

# Pivot the data to create a user-item matrix
user_item_matrix = train_data.pivot_table(index='user_id', columns='music_id',
        values=['rating', 'genre_encoded', 'timestamp_encoded'])

#user_item_matrix = user_item_matrix.astype('object')

# Fill missing values with 0
user_item_matrix = user_item_matrix.fillna(0)

# Calculate cosine similarity between users
user_similarity = cosine_similarity(user_item_matrix)

# Function to get recommendations for a user
def get_recommendations(user_id, num_recommendations=5):
    if user_id >= len(user_similarity):
        print("Error: Invalid user ID.")
        return []
    print("user_id:", user_id)
    print("user_similarity shape:", user_similarity.shape)
    # Find the top similar users to the given user
    similar_users = sorted(list(enumerate(user_similarity[user_id])), key=lambda x: x[1], reverse=True)[1:]
    
    # Get music IDs that the user hasn't interacted with
    user_music_ids = user_item_matrix.columns
    user_interacted_music = train_data[train_data['user_id'] == user_id]['music_id']
    user_uninteracted_music = [music_id for music_id in user_music_ids if music_id not in user_interacted_music]
    
    # Calculate the recommendation scores for uninteracted music
    recommendations = []
    for music_id in user_uninteracted_music:
        score = 0
        for sim_user, similarity in similar_users:
            if user_item_matrix.loc[sim_user, music_id] != 0:
                score += similarity * user_item_matrix.loc[sim_user, music_id]
        recommendations.append((music_id, score))
    
    # Sort the recommendations by score
    recommendations.sort(key=lambda x: x[1], reverse=True)
    
    # Return top recommendations
    return recommendations[:num_recommendations]

# Example usage
user_id = 2
recommendations = get_recommendations(user_id)
print("Recommendations for user", user_id, ":")
for i, (music_id, score) in enumerate(recommendations, start=1):
    print(f"{i}. Music ID: {music_id}, Score: {score}")

