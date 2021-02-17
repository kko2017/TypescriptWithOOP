{
    type Video = {
        id: string;
        title: string;
        url: string;
        data: string;
    };

    type VideoMetadata = Omit<Video, 'url' | 'data'>;

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
            title: 'Hi, World!'
        };
    }
}