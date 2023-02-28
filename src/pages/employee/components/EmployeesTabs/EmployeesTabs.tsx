import { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import EmployeesDB from '../EmployeesDB/EmployeesDB';
import MentorsCards from '../MetorsCards/MentorsCards';

interface TabsItems {
  title: string;
  count: number;
}

const TabsItem: TabsItems[] = [
  { title: 'Все сотрудники', count: 25 },
  { title: 'Менеджеры', count: 10 },
  { title: 'Преподаватели', count: 8 },
  { title: 'Админы', count: 8 },
];

const useStyles = makeStyles({
  root: {
    marginLeft: '25px',
    '& .Mui-selected .MuiTab-wrapper': {
      borderBottom: 'none',
    },
    '& .MuiTabs-indicator': {
      display: 'none',
    },
  },
  Tabs: {
    marginBottom: '29px',
    fontSize: '18px',
    textTransform: 'none',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  activeTab: {
    transition: 'all 0.5s',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    borderRadius: '16px',
  },
  tabCount: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '10px',
    width: '30px',
    height: '27px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '5px',
  },
  activeTabCount: {
    color: '#252525',
    height: '28px',
    padding: '4px 8px',
    borderRadius: '8px',
    width: '28px',
    background: '#E5E5E5',
  },
});

export default function TabComponent() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs value={value} onChange={handleChange}>
        {TabsItem?.map((tab, idx: number) => (
          <Tab
            key={idx}
            className={`${classes.Tabs} ${value === idx ? classes.activeTab : ''}`}
            label={
              <div>
                {tab.title}
                <span
                  className={`${classes.tabCount} ${value === idx ? classes.activeTabCount : ''}`}>
                  {tab.count}
                </span>
              </div>
            }
          />
        ))}
      </Tabs>
      {value === 0 && <EmployeesDB />}
      {value === 1 && <EmployeesDB />}
      {value === 2 && <MentorsCards />}
      {value === 3 && <EmployeesDB />}
    </div>
  );
}
