import axios from 'axios';

const getCurentWatchedTime = async (
  contentId: number,
): Promise<any> => {
  const uscreenEndPoint = `https://www.uscreen.io/publisher_api/v1/analytics/videos/views/total_watch_time?content_id=${contentId}`;
  const headers = {
    Authorization: `Bearer ${process.env.USCREEN_API_TOKEN}`,

    'Content-Type': 'application/json',
  };

  const response = await axios.get(uscreenEndPoint, { headers });
  return response.data;
};

export default getCurentWatchedTime;
