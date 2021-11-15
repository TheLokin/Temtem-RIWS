import { Button, Grid, Slider, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import React from 'react';

const tvsIcons = [
    { name: 'ATK', url: '/images/stats/ATK.png' },
    { name: 'DEF', url: '/images/stats/DEF.png' },
    { name: 'HP', url: '/images/stats/HP.png' },
    { name: 'SPATK', url: '/images/stats/SPATK.png' },
    { name: 'SPD', url: '/images/stats/SPD.png' },
    { name: 'SPDEF', url: '/images/stats/SPDEF.png' },
    { name: 'STA', url: '/images/stats/STA.png' },
];

const getTvs = (tvs) => {
    let anchor = 12;
    let keys = Object.keys(tvs);
    if (keys.filter((key) => tvs[key] > 0).length > 1) anchor = 6;
    return keys.map((tv) => {
        if (tvs[tv]) {
            let tvReturn = tvsIcons.filter((icon) => icon.name === tv);
            return (
                <Tooltip key={tvReturn[0].name + tvs} title={tvReturn[0].name}>
                    <Grid xs={anchor} item>
                        <Image
                            alt="tv-image"
                            className="tv-image"
                            src={tvReturn[0].url}
                            width={30}
                            height={30}
                            loading="lazy"
                        />

                        <Typography className="subsubtitle overTv">
                            {tvs[tv]}
                        </Typography>
                    </Grid>
                </Tooltip>
            );
        }
    });
};

export default function Result(props) {
    const { temtems, map, markerRefs } = props;

    function setView(coords) {
        map.setView(coords, 6);
        let refs = markerRefs.filter(
            (marker) =>
                marker._latlng.lat === coords[0] &&
                marker._latlng.lng === coords[1]
        );
        refs[0].openPopup();
    }

    return (
        <Box className="results">
            <Typography
                className="title"
                variant="h6"
                gutterBottom
                align={'center'}
            >
                Resultados
            </Typography>
            <Typography
                className="subsubtitle before-list"
                variant="h6"
                gutterBottom
                align={'center'}
            >
                Número de resultados: {temtems ? temtems.length : 0}
            </Typography>
            {temtems &&
                temtems.map(function (item) {
                    return (
                        <Box className="result" key={item._source.name}>
                            <Typography align={'center'} className="subtitle">
                                {item._source.name}
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid
                                    item
                                    xs={4}
                                    md={4}
                                    alignSelf="center"
                                    align="center"
                                >
                                    <Typography align={'center'} gutterBottom>
                                        {item._source.types.map(function (
                                            type
                                        ) {
                                            return (
                                                <Tooltip
                                                    key={type.name}
                                                    title={type.name.slice(
                                                        0,
                                                        -5
                                                    )}
                                                >
                                                    <span>
                                                        <Image
                                                            alt="type-image"
                                                            src={`data:image/png;base64,${type.icon}`}
                                                            width={30}
                                                            height={30}
                                                        />
                                                    </span>
                                                </Tooltip>
                                            );
                                        })}
                                    </Typography>
                                    <Box
                                        className="temtemImageContainer"
                                        key={item._source}
                                    >
                                        <Image
                                            className="temtemImage"
                                            alt="temtem-image"
                                            src={`data:image/png;base64,${item._source.portrait}`}
                                            width={52}
                                            height={52}
                                        />
                                    </Box>
                                    {item._source.genderRatio === -1 ? (
                                        <Typography
                                            className="subtitle"
                                            align="center"
                                            gutterBottom
                                        >
                                            N/A
                                        </Typography>
                                    ) : (
                                        <Tooltip
                                            key={item._source + 1}
                                            title={
                                                item._source.genderRatio +
                                                '% ♂ - ' +
                                                (100 -
                                                    item._source.genderRatio) +
                                                '% ♀'
                                            }
                                        >
                                            <Box container className="gender">
                                                <Slider
                                                    key={item._source}
                                                    className="slider-gender"
                                                    value={
                                                        item._source.genderRatio
                                                    }
                                                    disabled
                                                />
                                            </Box>
                                        </Tooltip>
                                    )}
                                    <Box className="attributes">
                                        <Grid container>
                                            {getTvs(item._source.TVs)}
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid
                                    item
                                    xs={8}
                                    md={8}
                                    alignSelf="center"
                                    align="center"
                                >
                                    <Grid container>
                                        <Grid
                                            item
                                            xs={12}
                                            md={12}
                                            className="locations"
                                        >
                                            <Grid container>
                                                {item.inner_hits.locations.hits.hits.map(
                                                    function (location) {
                                                        return (
                                                            <Grid
                                                                key={
                                                                    location
                                                                        ._source
                                                                        .position
                                                                        .lat +
                                                                    item._source
                                                                        .name +
                                                                    location
                                                                        ._source
                                                                        .position
                                                                        .lng
                                                                }
                                                                item
                                                                xs={12}
                                                                md={12}
                                                                component={
                                                                    Button
                                                                }
                                                                onClick={() =>
                                                                    setView([
                                                                        location
                                                                            ._source
                                                                            .position
                                                                            .lat,
                                                                        location
                                                                            ._source
                                                                            .position
                                                                            .lng,
                                                                    ])
                                                                }
                                                                className="location"
                                                            >
                                                                <Grid
                                                                    item
                                                                    xs={8}
                                                                >
                                                                    {' '}
                                                                    {
                                                                        location
                                                                            ._source
                                                                            .route
                                                                    }
                                                                </Grid>
                                                                <Grid
                                                                    item
                                                                    xs={4}
                                                                >
                                                                    {' '}
                                                                    {
                                                                        location
                                                                            ._source
                                                                            .frequency
                                                                    }
                                                                    {'%'}
                                                                </Grid>
                                                            </Grid>
                                                        );
                                                    }
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    );
                })}
        </Box>
    );
}
