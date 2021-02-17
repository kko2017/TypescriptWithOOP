{
    type Video = {
        id: string;
        title: string;
        url: string;
        data: string;
    };

    type VideoMetadata = Pick<Video, 'id' | 'url'>;

    function getVideo(id: string): Video {
        return {
            id,
            title: 'Haru',
            url: 'https://www..',
            data:'byte-data...'                    
        };
    }

    function getVideoMetaData(id: string): VideoMetadata  {
        return {
            id,
            url: 'https://www...'
        };
    }
}