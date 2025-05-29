import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import { fNumber, fPercent } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { Chart, useChart } from 'src/components/chart';
import axios, { endpoints } from '../../../utils/axios';

// ----------------------------------------------------------------------

export default function TopBAWidget() {
  const [baLeaders, setBaLeaders] = useState([]);

  useEffect(() => {
    const fetchBaComparison = async () => {
      try {
        const response = await axios.get(endpoints.battingAverageComparison);
        const top5 = response.data.slice(0, 5); 
        setBaLeaders(top5);
      } catch (error) {
        console.error('Failed to fetch BA comparison:', error);
      }
    };

    fetchBaComparison();
   
  }, []);

 
return (
    <>
      {baLeaders.map((player, index) => (
        <AppWidgetSummary
          key={player.player_name}
          title={player.player_name}
          total={player.ba}
          percent={(player.ba - 0.25) / 0.25} // comparison baseline
          chart={{
            series: [player.ba],
            categories: [`#${index + 1}`],
            colors: ['#3f51b5'],
          }}
          sx={{ mb: 3 }}
        />
      ))}
    </>
  );
}

