
import React, { useState } from 'react';
import { List, ListItem, Divider, Typography, ListItemAvatar, ListItemText, Avatar } from '@mui/material';

const InstitutionsList = () => {

    const [institutions, setInstitutions] = useState([
        {
            "name": "Associação Caminho",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis erat urna, sed cursus metus vulputate in. In ornare, ligula vitae eleifend vestibulum, libero est sollicitudin lectus, id elementum felis ante quis lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed varius elementum sapien, eu tincidunt enim fermentum eget. Nulla rhoncus nisl vel urna gravida, in lacinia sapien ornare. Nam lacus mi, venenatis sed placerat et, tempus vel nunc. Cras finibus nisi magna, in imperdiet nisi ornare sed. Phasellus est nisi, pharetra quis tempus quis, pulvinar vitae mauris. Phasellus sollicitudin porta purus in scelerisque. Nulla facilisi.",
            "supportType": "Children"
        },
        {
            "name": "Associação Pata",
            "description": "Proin vehicula turpis a tellus cursus euismod. Pellentesque dui arcu, fermentum ac urna sed, faucibus pretium nisi. In hac habitasse platea dictumst. Morbi aliquet tellus nec elementum hendrerit. Donec ut lacinia dui, et ultrices dui. Maecenas pharetra nec nulla quis imperdiet. Donec facilisis justo ac consequat posuere. Duis eget velit nisl. Ut maximus dictum nulla vitae fermentum. Nam aliquam quis lectus ac aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam sed dolor porta eros dapibus scelerisque.",
            "supportType": "Pets"
        },
        {
            "name": "Associação Casa",
            "description": "Proin vehicula turpis a tellus cursus euismod. Pellentesque dui arcu, fermentum ac urna sed, faucibus pretium nisi. In hac habitasse platea dictumst. Morbi aliquet tellus nec elementum hendrerit. Donec ut lacinia dui, et ultrices dui. Maecenas pharetra nec nulla quis imperdiet. Donec facilisis justo ac consequat posuere. Duis eget velit nisl. Ut maximus dictum nulla vitae fermentum. Nam aliquam quis lectus ac aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam sed dolor porta eros dapibus scelerisque.",
            "supportType": "House Recovery"
        },
        {
            "name": "Associação Aid",
            "description": "Proin vehicula turpis a tellus cursus euismod. Pellentesque dui arcu, fermentum ac urna sed, faucibus pretium nisi. In hac habitasse platea dictumst. Morbi aliquet tellus nec elementum hendrerit. Donec ut lacinia dui, et ultrices dui. Maecenas pharetra nec nulla quis imperdiet. Donec facilisis justo ac consequat posuere. Duis eget velit nisl. Ut maximus dictum nulla vitae fermentum. Nam aliquam quis lectus ac aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam sed dolor porta eros dapibus scelerisque.",
            "supportType": "Elderly"
        }
    ])
    return (
        <div
            style={{
                justifyContent: 'left',
                alignItems: 'left',
                height: '100vh',
                padding: "0.2rem calc((100vw - 1000px) / 10)"
            }}
        >
            <h1>Institutions</h1>
            <List sx={{  bgcolor: 'background.paper' }}>
                {institutions.map((institution) => {
                    return (
                        <>
                            <ListItem alignItems="flex-start" >
                                <img src='/static/images/institution1.png' width={'150px'} />
                                <ListItemText
                                    primary={institution.name}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {institution.supportType}
                                            </Typography> <p>
                                                {institution.description}
                                            </p>

                                        </React.Fragment>
                                    }
                                />

                            </ListItem>
                            <Divider variant="middle" component="li" />
                            <Divider variant="middle" component="li" />

                        </>
                    )
                })}
            </List>
        </div>
    );
};

export default InstitutionsList;